import * as core from '@actions/core'

export type Args = {
    releaseId: number
    uploadUrl: string
    files: Array<string>
}

export function getAndValidateArgs(): Args {
    const inputFilesStr = core.getInput('files', { required: true })
    const args: Args = {
        releaseId: JSON.parse(core.getInput('release_id', { required: true })) as number,
        uploadUrl: core.getInput('upload_url', { required: true }),
        files: inputFilesStr.split(/\r?\n/),
    }

    return args
}
