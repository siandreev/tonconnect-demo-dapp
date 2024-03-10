import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./Header.tsx";
import {SendTx} from "./SendTx.tsx";
import {Settings} from "./Settings.tsx";

function App() {
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
    <Header />
    <SendTx />
    <Settings />
  </TonConnectUIProvider>
}

export default App
