import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSigner } from 'wagmi'
import { Stash } from 'stash-renting-sdk'
import { useState } from 'react';
export default function Home() {

  const [nftData, setNftData] = useState();
  const { data: signer } = useSigner();
  const apiKey = '27afdad77ae112cffa47de5c3236a63da959b891';

  const handleGetNFTData = async () => {
    if(signer?._address) {
      const stash = new Stash(apiKey, signer, 1, '');
      const stashAPI =  stash.contracts.api;
      const contractAddress = '0x001';
      const token = '123456';
      stashAPI.getNFTData(contractAddress, token).then((res) => {
        if(res.data) {
          setNftData(res.data)
        }
      }).catch((err) => {
        console.log('err', err);
      });
    }
  }; 

  return (
   <div>
      <ConnectButton />
       {signer?._address && 
       (
        <>
          <p>Signer available for : {signer._address}</p>
          <button onClick={handleGetNFTData}>Get NFT Data</button>
          {nftData &&
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            borderRadius: '10px',
            padding: '10px 15px',
            cursor: 'pointer',
            marginTop: '20px',
            width: 'fit-content',
          }}>
            <p>Token ID: {nftData?.token_id}</p>
            <p>NFT Address: {nftData?.nft_address}</p>
          </div>}
        </>
       )
       }
   </div>
  )
}
