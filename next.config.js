/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false
let assetPrefix = ''
let basePath = ''
if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}
const nextConfig = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  output: "export",
  images: {
    loader: 'imgix',
    path: 'https://lanyetc.imgix.net',
  },
}

module.exports = nextConfig
