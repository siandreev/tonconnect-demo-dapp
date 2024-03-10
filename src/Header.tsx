import {CHAIN, TonConnectButton, toUserFriendlyAddress, useTonWallet} from "@tonconnect/ui-react";

export const Header = () => {
    const wallet = useTonWallet();

    return <div style={{display: 'flex', justifyContent:'space-between'}}>
        {
            wallet ? <>
                {
                    'name' in wallet ? <div>
                        <div>Кошелек: {wallet.name}</div>
                        <div>Адрес: {toUserFriendlyAddress(wallet.account.address, wallet.account.chain === CHAIN.TESTNET)}</div>
                        <img src={wallet.imageUrl} height="50px" width="50px" />

                    </div> : `Подключен неизвестный кошелек ${wallet.device.appName}`
                }
            </> : 'Кошелек не подключен'
        }
        <TonConnectButton />
    </div>
}
