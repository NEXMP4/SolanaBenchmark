use anchor_lang::prelude::*;

declare_id!("Benchmark1111111111111111111111111111111111");

#[program]
pub mod benchmark {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Contract initialized!");
        Ok(())
    }

    pub fn store_value(ctx: Context<Store>, value: u64) -> Result<()> {
        let account = &mut ctx.accounts.data_account;
        account.value = value;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub data_account: Account<'info, DataAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Store<'info> {
    #[account(mut)]
    pub data_account: Account<'info, DataAccount>,
}

#[account]
pub struct DataAccount {
    pub value: u64,
}

