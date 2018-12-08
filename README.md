# Heritage Node API

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

## Notes on mongoose models/schema

In order to add a entry in the schema, you must modify the file `./models/tokenmodel` to include the name and type. For example, the function below sets `minter` to a value of `sender`

```javascript
Tokenmodel.findOneAndUpdate(
  { TokenID: tokenID },
  { $set: { owner: to, amount: value, minter: sender } },
  {
    upsert: true,
    new: true
  },
  (err, token) => {
    console.log('Donation complete.');
    console.log(token);
  }
```

Be sure that the schema includes `minter`.

```
minter: {
  type: String
}
```

QED
