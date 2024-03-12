import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./Header.tsx";
import {SendTx} from "./SendTx.tsx";
import {Settings} from "./Settings.tsx";
import {BackendTokenContext} from "./BackendTokenContext.ts";
import {useState} from "react";
import {ProvideBackendAuth} from "./ProvideBackendAuth.tsx";
import {OnlyAuthUserData} from "./OnlyAuthUserData.tsx";

function App() {
  const [token, setToken] = useState<string | undefined>(undefined);

  return <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      uiPreferences={{
        borderRadius: 'none',
        colorsSet: {
          [THEME.DARK]: {
              connectButton: {
                background: 'orange'
              }
          },
          [THEME.LIGHT]: {
            background: {
              qr: 'red'
            }
          }
        }
      }}
      actionsConfiguration={{
          modals: 'all',
          notifications: ['error']
      }}
  >
      <BackendTokenContext.Provider value={{ token, setToken }}>
          <ProvideBackendAuth />
          <Header />
          <SendTx />
          <Settings />
          <OnlyAuthUserData />
      </BackendTokenContext.Provider>
  </TonConnectUIProvider>
}

export default App
