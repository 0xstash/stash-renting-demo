import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSigner } from 'wagmi'
import { Stash, NFTStandard, Chain } from 'stash-renting-sdk'
import { useState } from 'react';
import { Box, Button, Flex, Heading, Text, Input, FormControl, FormLabel, Switch } from '@chakra-ui/react';

export default function Home() {

  const [nftData, setNftData] = useState();
  const [nftAddress, setNftAddress] = useState();

  const [apiKey, setApiKey] = useState('056a11df8ec19003cd4dd4b34e05c55c55c1e06d');
  const [tokenVal, setToken] = useState();
  const [lendBtn, setLendBtn] = useState(false);
  const [rentBtn, setRentBtn] = useState(false);
  const [apiBtn, setApiBtn] = useState(false);
  const [nftStandard, setNftStandard] = useState(NFTStandard.E721);
  const [expiry, setExpiry] = useState();
  const [perDayPrice, setPerDayPrice] = useState();
  const [erc20Address, setErc20Address] = useState('0xd73D2595A37AC493f8c4c727b4161995F09eEb13');
  const [revShare, setRevShare] = useState();
  const [buyPrice, setBuyPrice] = useState();
  const [maxRentalDays, setMaxRentalDays] = useState();
  const [rentDuration, setRentDuration] = useState();

  const { data: signer } = useSigner();

  const handleGetNFTData = async () => {
    if(signer?._address && nftAddress && tokenVal) {
      setApiBtn(true);
      const stash = new Stash(apiKey, signer, Chain.ETH, '');
      const stashAPI =  stash.contracts.api;
      stashAPI.getAsset(nftAddress, parseInt(tokenVal)).then((res) => {
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

  const handleNFTLend = async () => {
    if(signer?._address) {
      if(nftAddress && tokenVal && expiry && perDayPrice && erc20Address && revShare && buyPrice && maxRentalDays) {
        setLendBtn(true);
        const stash = new Stash(apiKey, signer, Chain.GOERLI, { 
          ERC721ContractAddress: nftAddress
        } );
        const stashMarket = stash.contracts.market;
        
        // Uncomment for testing wrapping
        // var wrappedAddress = null;
        // try {
          // const wrapTxn = await stash.contracts.wrapperFactory.wrap(
          //     1, 
          //     nftStandard, 
          //     (res) => {
          //         console.log('result:', res);
          //         wrappedAddress = res.args.wrappedAddress;
          //     },
          //     (error) => {
          //         if (error) {
          //             console.log('error', error.message);
          //         }
          //     });
          // await wrapTxn?.wait();
        // } catch {
        //   console.log('wrap failed');
        // }
        // console.log('wrapped address', wrappedAddress);

        // Uncomment for testing setRentalTerms call alone
        // const txn = await stashMarket.contract.setRentalTerms(
        //   "0x52dFC461c81a7914D3C978047ac463c57086Bb61",
        //   1,
        //   1,
        //   60 * 60 * 24,
        //   ethers.utils.parseEther("0.05"),
        //   100,
        //   10.0,
        //   erc20Address,
        //   100
        // );
        // print('txn', txn);

        await stashMarket.lend(
          parseInt(tokenVal),
          nftStandard,
          parseInt(expiry),
          parseFloat(perDayPrice),
          erc20Address,
          parseFloat(revShare),
          parseFloat(buyPrice),
          parseInt(maxRentalDays),
          (success) => {
            // On success
            if(success.args.rentalId) {
              // rentalId in bignumber success.args.rentalId
              console.log('rental Id', success.args.rentalId.toHexString());
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

  const handleNFTRent = async () => {
    if(signer?._address) {
      if(nftAddress && tokenVal && rentDuration) {
        setRentBtn(true);
        const stash = new Stash(apiKey, signer, Chain.GOERLI, { 
          ERC721ContractAddress: nftAddress
        } );
        const stashMarket = stash.contracts.market;
  
        await stashMarket.rent(
          parseInt(tokenVal),
          nftStandard,
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
        );
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
              <Heading size={'md'}>NFT Data</Heading>
              <Input placeholder='NFT Contract Address' size='md' width={'35%'} value={nftAddress} onChange={(e) => setNftAddress(e.target.value)}/>
              <Input placeholder='Token ID' size='md' width={'35%'} value={tokenVal} onChange={(e) => setToken(e.target.value)}/>
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
            </Flex>
            <Flex flexDirection={'column'} gap={5}>
              <Heading size={'md'}>Fetch Asset Information From API</Heading>
              <Input placeholder='API Key' size='md' width={'35%'} value={apiKey} onChange={(e) => setApiKey(e.target.value)}/>
              <Flex gap={10}>
                <Button w={'fit-content'} onClick={handleGetNFTData} isLoading={apiBtn}>Fetch Info</Button>
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
              <Input type={'number'} placeholder='Expiry in days' size='md' width={'35%'} value={expiry} onChange={(e) => setExpiry(e.target.value)}/>
              <Input type={'number'} placeholder='Per day price' size='md' width={'35%'} value={perDayPrice} onChange={(e) => setPerDayPrice(e.target.value)}/>
              <Input placeholder='ERC20 Address' size='md' width={'35%'} value={erc20Address} onChange={(e) => setErc20Address(e.target.value)}/>
              <Input type={'number'} placeholder='Revenue share' size='md' width={'35%'} value={revShare} onChange={(e) => setRevShare(e.target.value)}/>
              <Input type={'number'} placeholder='Buy price' size='md' width={'35%'} value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)}/>
              <Input type={'number'} placeholder='Max rental days' size='md' width={'35%'} value={maxRentalDays} onChange={(e) => setMaxRentalDays(e.target.value)}/>
              <Button w={'fit-content'} onClick={handleNFTLend} isLoading={lendBtn}>Lend Asset</Button>
            </Flex>
            <Flex flexDirection={'column'} gap={5}>
              <Heading size={'md'}>Rent Asset</Heading>
              <Input type={'number'} placeholder='Rent Duration' size='md' width={'35%'} value={rentDuration} onChange={(e) => setRentDuration(e.target.value)}/>
              <Button w={'fit-content'} onClick={handleNFTRent} isLoading={rentBtn}>Rent Asset</Button>
            </Flex>
          </Flex>
          
        </>
       )
       }
   </Box>
  )
}
