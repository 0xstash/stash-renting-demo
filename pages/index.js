import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSigner } from 'wagmi'
import { Stash } from 'stash-renting-sdk'
import { useEffect } from 'react';
export default function Home() {

  const { data: signer } = useSigner();

  useEffect(() => {
    if(signer?._address) {
      // const stash = new Stash();
      // console.log('stash', stash);
    }
  }, [signer?._address])

  return (
   <div>
    <p>Here</p>
      <ConnectButton />
       {signer?._address && <p>Signer available for : {signer._address}</p>}
   </div>
  )
}
