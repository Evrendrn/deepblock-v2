import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { connectorsByName } from '../utils/web3React'
import { setupNetwork } from '../utils/wallet'
import { ToastContainer, toast } from 'material-react-toastify';

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();
  
  const login = useCallback((connectorID) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
      activate(connector, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector);
          }
        } else {
          connector.walletConnectProvider = undefined;
          toast.error(error.message, {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          });
        }
      })
    } else {
      toast.error("Can't find connector", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
