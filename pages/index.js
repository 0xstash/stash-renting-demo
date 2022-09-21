import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSigner } from 'wagmi'
import { Stash, NFTStandard, Chain, WrapperFactory, PaymentToken } from 'stash-renting-sdk'
import { useState } from 'react';
import { Box, Button, Flex, Heading, Text, Input, FormControl, FormLabel, Switch } from '@chakra-ui/react';

export default function Home() {

  const [nftData, setNftData] = useState();
  const [nftAddress, setNftAddress] = useState();

  const [tokenVal, setToken] = useState();
  const [rentalId, setRentalId] = useState();
  const [lendBtn, setLendBtn] = useState(false);
  const [rentBtn, setRentBtn] = useState(false);
  const [apiBtn, setApiBtn] = useState(false);
  const [nftStandard, setNftStandard] = useState(NFTStandard.E721);
  const [expiry, setExpiry] = useState();
  const [perDayPrice, setPerDayPrice] = useState();
  const [erc20Address, setErc20Address] = useState('0xd73D2595A37AC493f8c4c727b4161995F09eEb13');
  const [revShare, setRevShare] = useState();
  const [buyPrice, setBuyPrice] = useState();
  const [wrap, setWrap] = useState(true);
  const [rentDuration, setRentDuration] = useState(1);

  const { data: signer } = useSigner();
  const apiKey = '27afdad77ae112cffa47de5c3236a63da959b891';

  const handleGetNFTData = async () => {
    if(signer?._address) {
      setApiBtn(true);
      const stash = new Stash(apiKey, signer, Chain.ETH, '');
      const stashAPI =  stash.contracts.api;
      const contractAddress = '0x001';
      const token = '123456';
      stashAPI.getNFTData(contractAddress, token).then((res) => {
        if(res.data) {
          setNftData(res.data)
          setApiBtn(false);
        }
      }).catch((err) => {
        console.log('err', err);
        setApiBtn(false);
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
      if(nftAddress && tokenVal && expiry && perDayPrice && erc20Address && revShare && buyPrice) {
        setLendBtn(true);
        const stash = new Stash(apiKey, signer, Chain.GOERLI, { 
          ERC721ContractAddress: nftAddress,
          //'0xF6a106Dc24176A31fBc75daAa4166745Fa8cbc2b',
          ERC721ContractABI: erc721Abi
        } );
        const stashMarket = stash.contracts.market;

        stashMarket.lend(
          parseInt(tokenVal),
          nftStandard,
          parseInt(expiry),
          parseFloat(perDayPrice),
          erc20Address,
          parseFloat(revShare),
          parseFloat(buyPrice),
          wrap,
          (success) => {
            // On success
            if(success.args.rentalId) {
              // rentalId in bignumber success.args.rentalId
              setRentalId(success.args.rentalId.toHexString());
              //Transaction has success.transactions[0].txn_hash
              setLendBtn(false);
            }
            console.log('success triggered',success);
          },
          (error) => {
            // On error
            console.log('error triggered',error);
            setLendBtn(false);
          }
        );
      }
      
    }
  }

  const handleNFTRent = () => {
    if(signer?._address) {
      if(rentalId && rentDuration) {
        setRentBtn(true);
        const stash = new Stash(apiKey, signer, Chain.GOERLI, { 
          ERC721ContractAddress: nftAddress,
          ERC721ContractABI: erc721Abi
        } );
        const stashMarket = stash.contracts.market;
  
        stashMarket.rent(
          parseInt(rentalId),
          parseInt(rentDuration),
          (success) => {
            // success.success will give the status 
            // success.transactions[0].txn_hash will give the transactoin hash
            console.log('rent success callback triggered',success);
            setRentBtn(false);
          },
          (error) => {
            // On error
            console.log('error triggered',error);
            setRentBtn(false);
          } 
        )
      }
    }
  }

  return (
   <Box p={5}>
      <ConnectButton />
       {signer?._address && 
       (
        <>
          <Flex flexDirection={'column'} mt={10} gap={10}>
            <Flex flexDirection={'column'} gap={5}>
              <Heading size={'md'}>Get NFT Data</Heading>
              <Flex gap={10}>
                <Button w={'fit-content'} onClick={handleGetNFTData} isLoading={apiBtn}>Get NFT Data</Button>
                  {nftData &&
                  <Box p={4}  borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <Text>Token ID: {nftData?.token_id}</Text>
                    <Text>NFT Address: {nftData?.nft_address}</Text>
                  </Box>
                  }
              </Flex>
            </Flex>
            <Flex flexDirection={'column'} gap={5}>
              <Heading size={'md'}>Lend Asset</Heading>
              <Input placeholder='NFT Contract Address' size='md' width={'25%'} value={nftAddress} onChange={(e) => setNftAddress(e.target.value)}/>
              <Input placeholder='Token ID' size='md' width={'25%'} value={tokenVal} onChange={(e) => setToken(e.target.value)}/>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='nftStandard' mb='0'>
                  E721 / E1155
                </FormLabel>
                <Switch id='nftStandard' onChange={(e) => {
                  if(e.target.checked) {
                    setNftStandard(NFTStandard.E1155);
                  } else {
                    setNftStandard(NFTStandard.E721);
                  }
                }} />
              </FormControl>
              <Input type={'number'} placeholder='Expiry in days' size='md' width={'25%'} value={expiry} onChange={(e) => setExpiry(e.target.value)}/>
              <Input type={'number'} placeholder='Per day price' size='md' width={'25%'} value={perDayPrice} onChange={(e) => setPerDayPrice(e.target.value)}/>
              <Input placeholder='ERC20 Address' size='md' width={'25%'} value={erc20Address} onChange={(e) => setErc20Address(e.target.value)}/>
              <Input type={'number'} placeholder='Revenue share' size='md' width={'25%'} value={revShare} onChange={(e) => setRevShare(e.target.value)}/>
              <Input type={'number'} placeholder='Buy price' size='md' width={'25%'} value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)}/>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='wrap' mb='0'>
                  Wrap needed ?
                </FormLabel>
                <Switch id='wrap' defaultChecked={true} onChange={(e) => {
                  if(e.target.checked) {
                    setWrap(true);
                  } else {
                    setWrap(false);
                  }
                }} />
              </FormControl>
              <Button w={'fit-content'} onClick={handleNFTLend} isLoading={lendBtn}>Lend Asset</Button>
            </Flex>
            <Flex flexDirection={'column'} gap={5}>
              <Heading size={'md'}>Rent Asset</Heading>
              <Input placeholder='Rental Id' size='md' width={'25%'} value={rentalId} onChange={(e) => setRentalId(e.target.value)}/>
              <Input type={'number'} placeholder='Rent Duration' size='md' width={'25%'} value={rentDuration} onChange={(e) => setRentDuration(e.target.value)}/>

              <Button w={'fit-content'} onClick={handleNFTRent} isLoading={rentBtn}>Rent Asset</Button>
            </Flex>
          </Flex>
          
        </>
       )
       }
   </Box>
  )
}
