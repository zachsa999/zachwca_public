import * as prismic from '@prismicio/client'

const repositoryName = 'svelte-tutorial'

const createClient = (params) => {
    const client = prismic.createClient(repositoryName, params)

    return client
}

export default createClient