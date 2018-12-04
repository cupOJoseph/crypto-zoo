Heritage Node API
=================

# Docs

## /api/contract
returns the network and address of the deployed contract this api is using.

## /api/
returns a list of options, that you can use this API for.

## /api/user/<address>
return a list of tokens that user owns, the number of tokens they own, their level of contribution

## /api/token?id=<id number>
returns the data associated with that token ID.
Example: `/api/token?id=4` will return 
```
  {
    "token_id": 4,
    "fundraiser_id": 1,
    "amount": 0.033,
    "donor": "0xe4b420f15d6d878dcd0df7120ac0fc1509ee9cab",
    "is_fundraiser": "FALSE"
  }
```