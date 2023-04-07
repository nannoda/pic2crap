import * as esbuild from 'esbuild'

console.log("build.js is running");

async function main() {
    const buildCtx = await esbuild.context({
        entryPoints: ['src/index.ts'],
        outdir: '.',
        sourcemap: true,
        bundle: true,
        logLevel: 'info',
    })
    buildCtx.serve({
        servedir: '.',
        port: 8080,
        host: 'localhost',
    })
}

main().then(() => {
    console.log("build.js is done");
}
);
