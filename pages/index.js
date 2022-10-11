import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSigner, useNetwork } from 'wagmi'
import { Stash, NFTStandard, Chain } from 'stash-renting-sdk'
import { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Text, Input, FormControl, FormLabel, Switch, Alert, AlertIcon } from '@chakra-ui/react';

export default function Home() {

  const [connectedChainId, setConnectedChainId] = useState();
  const [isChainCompatible, setIsChainCompatible] = useState(false); 

  const [nftData, setNftData] = useState();
  const [payoutRecipients, setPayoutRecipients] = useState();
  const [nftAddress, setNftAddress] = useState();

  const [apiKey, setApiKey] = useState('056a11df8ec19003cd4dd4b34e05c55c55c1e06d');
  const [tokenVal, setToken] = useState();
  const [lendBtn, setLendBtn] = useState(false);
  const [endLendBtn, setEndLendBtn] = useState(false);
  const [rentBtn, setRentBtn] = useState(false);
  const [apiBtn, setApiBtn] = useState(false);
  const [getRecipientsBtn, setGetRecipientsBtn] = useState(false);
  const [nftStandard, setNftStandard] = useState(NFTStandard.E721);
  const [amount, setAmount] = useState(1);
  const [expiry, setExpiry] = useState();
  const [perDayPrice, setPerDayPrice] = useState();
  const [erc20Address, setErc20Address] = useState('0xd73D2595A37AC493f8c4c727b4161995F09eEb13');
  const [revShare, setRevShare] = useState();
  const [buyPrice, setBuyPrice] = useState();
  const [maxRentalDays, setMaxRentalDays] = useState();
  const [rentDuration, setRentDuration] = useState();

  const { data: signer } = useSigner();
  const { chain } = useNetwork();

  const handleGetNFTData = async () => {
    if(signer?._address && nftAddress && tokenVal) {
      setApiBtn(true);
      const stash = new Stash(apiKey, signer, connectedChainId, '');
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
      if(nftAddress && tokenVal && expiry && perDayPrice && erc20Address && revShare && buyPrice && maxRentalDays && amount > 0) {
        setLendBtn(true);
        const stash = new Stash(apiKey, signer, connectedChainId, { 
          ERC721ContractAddress: nftAddress
        } );
        const stashMarket = stash.contracts.market;

        // Uncomment for retrieving wrapped address
        // const wrappedAddress = await stash.contracts.wrapperFactory.getWrappedAddress(nftStandard);
        // console.log('wrapped address', wrappedAddress);
        
        // Uncomment for testing wrapping
        // var wrappedAddress = null;
        // try {
        //   const wrapTxn = await stash.contracts.wrapperFactory.wrap(
        //       parseInt(tokenVal), 
        //       parseInt(amount),
        //       nftStandard, 
        //       (res) => {
        //           console.log('result:', res);
        //           wrappedAddress = res.args.wrappedAddress;
        //       },
        //       (error) => {
        //           if (error) {
        //               console.log('error', error.message);
        //           }
        //       });
        //   await wrapTxn?.wait();
        // } catch {
        //   console.log('wrap failed');
        //   setLendBtn(false);
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
          parseInt(amount),
          nftStandard,
          parseInt(expiry),
          parseFloat(perDayPrice),
          erc20Address,
          parseFloat(revShare),
          parseFloat(buyPrice),
          parseInt(maxRentalDays),
          (success) => {
            // On success
            if(success.args.termsId) {
              // termsId in bignumber success.args.termsId
              console.log('rental Id', success.args.termsId.toHexString());
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
        const stash = new Stash(apiKey, signer, connectedChainId, { 
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

  const handleEndLend = async () => {
    if(signer?._address) {
      if(nftAddress && tokenVal) {
        setEndLendBtn(true);
        const stash = new Stash(apiKey, signer, connectedChainId, { 
          ERC721ContractAddress: nftAddress
        } );
        const stashMarket = stash.contracts.market;

        // Uncomment to test unwrapping
        // try {
        //   const unwrapTxn = await stash.contracts.wrapperFactory.unwrap(
        //       parseInt(tokenVal), 
        //       nftStandard, 
        //       (res) => {
        //         console.log('result:', res);
        //         setEndLendBtn(false);
        //       },
        //       (error) => {
        //         console.log('error triggered', error);
        //         setEndLendBtn(false);
        //       });
        //   await unwrapTxn?.wait();
        // } catch (exception) {
        //   console.log('error with exception', exception);
        //   setEndLendBtn(false);
        // }
  
        await stashMarket.endLend(
          parseInt(tokenVal),
          parseInt(amount),
          nftStandard,
          (success) => {
            console.log('end lend success callback triggered', success);
            setEndLendBtn(false);
          },
          (error) => {
            // On error
            console.log('error triggered', error);
            setEndLendBtn(false);
          }
        );
      }
    }
  }

  const handleGetPayoutRecipients = async () => {
    if(signer?._address) {
      if(nftAddress && tokenVal) {
        setGetRecipientsBtn(true);
        const stash = new Stash(apiKey, signer, connectedChainId, { 
          ERC721ContractAddress: nftAddress
        } );
  
        const recipients = await stash.getPayoutRecipients(
          parseInt(tokenVal),
          nftStandard,
          (error) => {
            // On error
            console.log('error triggered', error);
            setGetRecipientsBtn(false);
          }
        );

        if (recipients) {
          console.log('recipients successfully fetched', recipients);
          setPayoutRecipients(recipients);
        }
        setGetRecipientsBtn(false);
      }
    }
  }

  useEffect(() => {
    if(chain) {
      const exists = Object.values(Chain).includes(chain.id);
      setIsChainCompatible(exists);
      setConnectedChainId(chain.id);
    }
  }, [chain])

  return (
   <Box p={5}>
      <ConnectButton />
      {!isChainCompatible && (
        <Alert status='error' mt={4}>
          <AlertIcon />
          You're on a wrong network. Supported chains are: Goerli, Mumbai and BSC Testnet
        </Alert>
      )}
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
              <Heading size={'md'}>Fetch Payout Recipients</Heading>
              <Flex gap={10}>
                <Button w={'fit-content'} onClick={handleGetPayoutRecipients} isLoading={getRecipientsBtn}>Fetch Payout Recipients</Button>
                  {payoutRecipients &&
                  <Box p={4}  borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <Text>Address: {payoutRecipients[0]?.address}</Text>
                    <Text>Share Point: {payoutRecipients[0]?.sharePoint}</Text>
                    <Text>Role: {payoutRecipients[0]?.role}</Text>
                  </Box>
                  }
              </Flex>
            </Flex>
            <Flex flexDirection={'column'} gap={5}>
              <Heading size={'md'}>Lend Asset</Heading>
              { (nftStandard == NFTStandard.E1155) &&
                <Input type={'number'} placeholder='Amount' size='md' width={'35%'} value={amount} onChange={(e) => setAmount(e.target.value)}/>
              }
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
            <Flex flexDirection={'column'} gap={5}>
              <Heading size={'md'}>End Lend Asset</Heading>
              <Button w={'fit-content'} onClick={handleEndLend} isLoading={endLendBtn}>End Lend</Button>
            </Flex>
          </Flex>
          
        </>
       )
       }
   </Box>
  )
}
