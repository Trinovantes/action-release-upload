import * as core from '@actions/core'
import { Context } from '@actions/github/lib/context'
import { Octokit } from '@octokit/rest'
import { readFileSync } from 'fs'
import { globby } from 'globby'
import path from 'path'
import { IArgs, getAndValidateArgs } from './Args'
import { getType } from 'mime'

// ----------------------------------------------------------------------------
// UploadAssets
// ----------------------------------------------------------------------------

export default class UploadAssets {
    readonly args: IArgs
    client: Octokit
    context: Context

    constructor() {
        core.startGroup('Initializing UploadAssets')
        this.args = getAndValidateArgs()
        this.client = new Octokit({ auth: process.env.GITHUB_TOKEN })
        this.context = new Context()
        core.endGroup()
    }

    async run(): Promise<void> {
        core.startGroup('Starting to upload assets')

        const paths = await globby(this.args.files)
        const uploadRequests: Array<Promise<void>> = []

        for (const filePath of paths) {
            uploadRequests.push(this.upload(filePath))
        }

        await Promise.all(uploadRequests)

        core.endGroup()
    }

    private async upload(filePath: string) {
        const data = readFileSync(filePath)
        const mime = getType(filePath) ?? 'application/octet-stream'
        core.info(`Uploading "${filePath}" len:${data.length} mime:${mime}`)

        await this.client.repos.uploadReleaseAsset({
            data: data as unknown as string,
            name: path.basename(filePath),
            url: this.args.uploadUrl,
            headers: {
                'content-length': data.length,
                'content-type': mime,
            },
            owner: this.context.repo.owner,
            repo: this.context.repo.repo,
            release_id: this.args.releaseId,
        })
    }
}
