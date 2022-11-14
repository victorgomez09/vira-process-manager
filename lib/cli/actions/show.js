const humanizeDuration = require('humanize-duration');
const pidusage = require('pidusage');
const cli = require('../index.js');

module.exports = async (info, args) => {
    const selected = cli.filterInfo(info, args.select, {
        implicitLoggers: cli.args.verbose
    });

    cli.reply('');

    const hadApps = printApplications('application', selected.applications);
    const hadLoggers = printApplications('logger', selected.applications);

    if (hadApps || hadLoggers)
        cli.reply('');

    const data = [
        ['Application/Nr.', 'ID', 'PID (OS)', 'CPU %', 'Memory', 'Uptime', 'Crashes'].map(_ => `{bold ${_}}`)
    ];

    let zombies = false;

    const generations = {
        queue: [],
        new: [],
        marked: [],
        running: [],
        old: []
    };

    for (const proc of Object.values(selected.processes)) {
        const gen = proc.generation;

        generations[gen].push(proc);
    }

    for (const name of ['queue', 'new', 'marked', 'running', 'old']) {
        const gen = generations[name];

        if (!gen) {
            continue;
        }

        const genRows = [];

        for (const proc of gen) {
            let app = proc['app'] || info.applications.find((app) => app.name === proc['app-name']);
            let name = `${app['name']}/${proc['number']}`;
            if (app['type'] === 'logger') {
                name = `{grey ${name} [${abbrev(proc.args.join(' '), 30)}]}`;
            }
            if (proc['app']) {
                name += ' {red (old)}';
            }
            if (proc.killing) {
                name += ' {green (Z)}';
                zombies = true;
            }

            const stats = await pidusage(proc.pid || "");
            const { cpu, memory } = stats;

            let humanRuntime = 'Queued';
            const startTime = new Date(proc['start-time']).getTime();
            if (startTime) {
                const runtime = Date.now() - startTime;
                humanRuntime = humanizeDuration(Math.abs(runtime), { round: true });

                if (runtime < 0) {
                    humanRuntime = "- " + humanRuntime + " {blue (!)}";
                }
            }

            genRows.push([name, proc['id'], proc['pid'], cpu, formatBytes(memory), humanRuntime, proc['crashes']]);
        }

        if (genRows.length === 0) {
            continue;
        }

        data.push([`{bold Gen: ${name}} (${genRows.length})`, '', '', '', '', '', '']);
        data.push(...genRows);
    }

    const legend = " {red (old)} {italic Outdated Configuration}" +
        " {blue (!)} {italic Start Delay}" +
        " {green (Z)} {italic Zombie}\n";

    cli.reply(cli.table(data) + legend);

    if (zombies) {
        cli.reply("Hint", "You have {green Zombie} processes. If they don't go away you should\n" +
            "get rid of them manually and check your signal handling.");
    }
};

function abbrev(str, len) {
    if (str.length <= len) {
        return str;
    }

    str = str.slice(0, len - 3);
    str += '...';

    return str;
}

function printApplications(type, applications) {
    const names = applications
        .filter(app => app.type === type && (!app.builtin || cli.args.verbose))
        .map(app => app.builtin ? `{gray ${app.name}}` : app.name);

    if (!names.length)
        return false;

    cli.reply(` {bold.white ${cli.capitalize(type)}s:} {bold ${names.join(' ')}}`);

    return true;
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}