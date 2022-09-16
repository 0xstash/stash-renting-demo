import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSigner } from 'wagmi'
import { Stash, NFTStandard, Chain, WrapperFactory, PaymentToken } from 'stash-renting-sdk'
import { useState } from 'react';
import { parseEther, parseUnits } from "@ethersproject/units";

export default function Home() {

  const [nftData, setNftData] = useState();
  const { data: signer } = useSigner();
  const apiKey = '27afdad77ae112cffa47de5c3236a63da959b891';

  const handleGetNFTData = async () => {
    if(signer?._address) {
      const stash = new Stash(apiKey, signer, Chain.ETH, '');
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

  const erc721Abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const handleNFTLend = () => {
    if(signer?._address) {
      const stash = new Stash(apiKey, signer, Chain.GOERLI, { 
        ERC721ContractAddress: '0xF6a106Dc24176A31fBc75daAa4166745Fa8cbc2b',
        ERC721ContractABI: erc721Abi
      } );
      const stashMarket = stash.contracts.market;

      // const txn = stash.contracts.wrapperFactory.wrap(0, NFTStandard.E721, (res) => {
      //   console.log('in here', res);
      // });
      stashMarket.lend(
        0,
        NFTStandard.E721,
        5,
        1,
        '0xd73D2595A37AC493f8c4c727b4161995F09eEb13',
        1,
        10,
        true,
        (res) => {
          console.log('callback triggered',res);
        }
      );
    }
  }

  const handleNFTRent = () => {
    if(signer?._address) {
      const stash = new Stash(apiKey, signer, Chain.GOERLI, { 
        ERC721ContractAddress: '0xF6a106Dc24176A31fBc75daAa4166745Fa8cbc2b',
        ERC721ContractABI: erc721Abi
      } );
      const stashMarket = stash.contracts.market;

      stashMarket.rent(
        parseInt('0x01'),
        1,
        (res) => {
          console.log('rent callback triggered',res);
        }
      )
      
    }
  }

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
          <button onClick={handleNFTLend}>Lend Asset</button>
          <button onClick={handleNFTRent}>Rent Asset</button>
        </>
       )
       }
   </div>
  )
}
