import {useContext, useEffect, useRef} from "react";
import {useIsConnectionRestored, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {BackendTokenContext} from "./BackendTokenContext.ts";
import {backendApi} from "./backend-api.ts";

const localStorageKey = 'tonconnect::token';

const getToken = () => localStorage.getItem(localStorageKey);
const storeToken = (token: string) => localStorage.setItem(localStorageKey, token);
const removeToken = () => localStorage.removeItem(localStorageKey);

const recreatePayloadFrequency = 1000 * 60 * 10;


export const ProvideBackendAuth = () => {
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useTonWallet();
    const { setToken } = useContext(BackendTokenContext);
    const [tonConnectUI] = useTonConnectUI();

    const interval = useRef<undefined | ReturnType<typeof setInterval>>(undefined);


    useEffect(() => {
        if (!isConnectionRestored || !setToken) {
            return;
        }

        clearInterval(interval.current);

        if (!wallet) {
            setToken(undefined);
            removeToken();

            const recreatePayload = async () => {
                tonConnectUI.setConnectRequestParameters({ state: 'loading' });

                const payload = await backendApi.generatePayload();
                if (payload) {
                    tonConnectUI.setConnectRequestParameters({ state: 'ready', value: { tonProof: payload } });
                } else {
                    tonConnectUI.setConnectRequestParameters(null);
                }
            }

            recreatePayload();

            interval.current = setInterval(recreatePayload, recreatePayloadFrequency);

            return () => {
                clearInterval(interval.current);
            };
        }

        const t = getToken();
        if (t) {
            // TODO if token lifetime is limited, then check lifetime and delete it and call tonConnectUI.disconnect() if expired
            // ...

            setToken(t);
            return;
        }

        if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
            backendApi.checkProof(wallet.account, wallet.connectItems.tonProof.proof).then(t => {
                if (t) {
                    setToken(t);
                    storeToken(t);
                } else {
                    alert('Something went wrong. Please try another wallet');
                    tonConnectUI.disconnect();
                }
            })
        } else {
            alert('Something went wrong. Please try another wallet');
            tonConnectUI.disconnect();
        }

    }, [isConnectionRestored, wallet, setToken, tonConnectUI]);


    return null;
}
