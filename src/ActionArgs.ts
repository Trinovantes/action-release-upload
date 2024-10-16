export type ActionArgs = {
    releaseId: number
    uploadUrl: string
    files: Array<string>
}

export function getActionArgs(): ActionArgs {
    const releaseId = parseInt(process.env.release_id ?? '')
    if (isNaN(releaseId)) {
        throw new Error('release_id is not a number')
    }

    const uploadUrl = process.env.upload_url
    if (!uploadUrl) {
        throw new Error('upload_url is missing')
    }

    const files = process.env.files?.split(/\r?\n/) ?? []
    if (files.length === 0) {
        throw new Error('files is empty')
    }

    return {
        releaseId,
        uploadUrl,
        files,
    }
}
