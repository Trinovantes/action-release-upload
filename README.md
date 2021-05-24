# Release Upload

This is a fork of [actions/upload-release-asset](https://github.com/marketplace/actions/upload-a-release-asset) but allows multiple file uploads specified as globby paths.

## Inputs

| Input        | Description
| ------------ | ---
| `release_id` | The id for the release
| `upload_url` | The upload URL for the release
| `files`      | Files to upload

## Outputs

None

## Example Usage

```
- name: Update Nightly Build Release
  id: update_nightly
  uses: Trinovantes/action-automatic-release@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    auto_release_tag: nightly
    auto_release_title: Nightly Build

- name: Upload Asset to Nightly Build Release
  uses:  Trinovantes/action-release-upload@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    release_id: ${{ steps.update_nightly.outputs.release_id }}
    upload_url: ${{ steps.update_nightly.outputs.upload_url }}
    files: |
        ./dist/*.html
        ./dist/*.css
        ./dist/*.js
```
