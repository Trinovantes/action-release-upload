import * as core from '@actions/core'
import UploadAssets from './UploadAssets.ts'

try {
    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
        throw new Error('process.env.GITHUB_TOKEN is undefined')
    }

    const uploadAssets = new UploadAssets(githubToken)
    await uploadAssets.run()
} catch (error) {
    core.setFailed(String(error))
}
