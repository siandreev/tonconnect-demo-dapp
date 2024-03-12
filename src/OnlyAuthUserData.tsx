import {useContext} from "react";
import {BackendTokenContext} from "./BackendTokenContext.ts";
import {backendApi} from "./backend-api.ts";
import {useTonWallet} from "@tonconnect/ui-react";

export const OnlyAuthUserData = () => {
    const { token } = useContext(BackendTokenContext);
    const wallet = useTonWallet();

    if (!token || !wallet) {
        return null;
    }

    const clickHandler = async () => {
        const response = await backendApi.getAccountInfo(token, wallet.account.chain)
        alert(JSON.stringify(response));
    }

    return <button onClick={clickHandler}>Fetch data</button>;
}
