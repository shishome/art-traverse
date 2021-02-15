import {Command, flags} from '@oclif/command'


class ArtTraverse extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(ArtTraverse)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from ./src/index.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
    var finder = require('findit2')(process.argv[2] || '.');
    var path = require('path');
    finder.on('directory', function (dir: any, stat: any, stop: any, linkPath: any) {
      var base = path.basename(dir);
      if (base === '.git' || base === 'node_modules') stop()
      else console.log(dir + '/')
    });

    finder.on('file', function (file: any, stat: any, linkPath: any) {
      console.log(file);
    });
  }

}

export = ArtTraverse
