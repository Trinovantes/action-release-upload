import { readFileSync } from 'node:fs'
import path from 'node:path'
import * as core from '@actions/core'
import { Octokit } from '@octokit/rest'
import { type ActionArgs, getActionArgs } from './ActionArgs.ts'
import Mime from 'mime'
import { globby } from 'globby'
import { Context } from '@actions/github/lib/context.js'

// ----------------------------------------------------------------------------
// UploadAssets
// ----------------------------------------------------------------------------

export default class UploadAssets {
    readonly args: ActionArgs
    readonly ghClient: Octokit
    readonly ghContext: Context

    constructor(githubToken: string) {
        this.args = getActionArgs()
        this.ghClient = new Octokit({ auth: githubToken })
        this.ghContext = new Context()
    }

    async run(): Promise<void> {
        core.info(JSON.stringify(this.args, undefined, 4))

        core.startGroup('Starting to upload assets')
        {
            const cwd = process.cwd()
            const filePaths = await globby(this.args.files, { cwd })
            core.info(`Found ${filePaths.length} files from ${cwd}`)
            core.info(JSON.stringify(filePaths, undefined, 4))

            const uploadRequests = filePaths.map((filePath) => this.upload(filePath))
            await Promise.all(uploadRequests)
        }
        core.endGroup()
    }

    private async upload(filePath: string) {
        const data = readFileSync(filePath)
        const mime = Mime.getType(filePath) ?? 'application/octet-stream'
        core.info(`Uploading "${filePath}" len:${data.length} mime:${mime}`)

        await this.ghClient.repos.uploadReleaseAsset({
            data: data as unknown as string,
            name: path.basename(filePath),
            url: this.args.uploadUrl,
            headers: {
                'content-length': data.length,
                'content-type': mime,
            },
            owner: this.ghContext.repo.owner,
            repo: this.ghContext.repo.repo,
            release_id: this.args.releaseId,
        })
    }
}
