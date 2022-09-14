import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSigner } from 'wagmi'

export default function Home() {

  const { data: signer } = useSigner();

  return (
   <div>
    <p>Here</p>
      <ConnectButton />
       {signer?._address && <p>Signer available for : {signer._address}</p>}
   </div>
  )
}
