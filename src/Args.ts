import * as core from '@actions/core'

export type Args = {
    releaseId: number
    uploadUrl: string
    files: Array<string>
}

export function getAndValidateArgs(): Args {
    const args: Args = {
        releaseId: parseInt(core.getInput('release_id', { required: true })),
        uploadUrl: core.getInput('upload_url', { required: true }),
        files: core.getInput('files', { required: true }).split(/\r?\n/),
    }

    return args
}
