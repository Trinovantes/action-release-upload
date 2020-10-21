import * as core from '@actions/core'
import UploadAssets from './UploadAssets'

async function main() {
    try {
        const uploadAssets = new UploadAssets()
        await uploadAssets.run()
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message)
        } else {
            core.setFailed(error)
        }
    }
}

void main()
