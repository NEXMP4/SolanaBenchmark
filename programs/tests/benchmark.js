const anchor = require('@project-serum/anchor');
const assert = require('assert');

describe('benchmark', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Benchmark;
  let dataAccount = anchor.web3.Keypair.generate();

  it('Initializes the contract', async () => {
    await program.methods
      .initialize()
      .accounts({
        dataAccount: dataAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([dataAccount])
      .rpc();

    const account = await program.account.dataAccount.fetch(dataAccount.publicKey);
    assert.strictEqual(account.value.toNumber(), 0);
  });

  it('Stores a value', async () => {
    await program.methods
      .storeValue(new anchor.BN(123))
      .accounts({
        dataAccount: dataAccount.publicKey,
      })
      .rpc();

    const account = await program.account.dataAccount.fetch(dataAccount.publicKey);
    assert.strictEqual(account.value.toNumber(), 123);
  });
});

