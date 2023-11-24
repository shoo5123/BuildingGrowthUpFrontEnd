export enum ProposalState {
    Pending, // 投票前(new)
    Active, // 投票中(voting)
    Canceled, // not used
    Defeated, // 否決(reject)
    Succeeded, // 可決されている(doing)
    Queued, // not used
    Expired,  // not used
    Executed // プロジェクト完了(done)
}