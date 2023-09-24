import * as core from '@actions/core'
import UploadAssets from './UploadAssets'

async function main() {
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
            core.setFailed(String(error))
        }
    }
}

void main()
