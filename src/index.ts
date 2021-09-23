import * as core from '@actions/core'
import UploadAssets from './UploadAssets'

void (async function main() {
    try {
        if (!process.env.GITHUB_TOKEN) {
            throw new Error('process.env.GITHUB_TOKEN is undefined')
        }

        const uploadAssets = new UploadAssets()
        await uploadAssets.run()
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message)
        } else {
            core.setFailed(error as string)
        }
    }
})()
