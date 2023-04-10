export function CustomHmr() {
    return {
        name: 'custom-hmr',
        enforce: 'post',
        handleHotUpdate({file, server}) {
            if (file.endsWith('.html')) {
                server.ws.send({
                    type: 'full-reload',
                    path: '*'
                });
            }
        },
    }
}
