const shell = require("shelljs");

const home = process.env.HOME;

process.chdir(home);

const bin = shell.exec("ls -a | grep bin").code === 0 ? true : false;

function is_bin_true() {
  if (bin) {
    console.log("Bin exists.");
  } else {
    shell.exec("mkdir bin");

    console.log("Bin was successfully created.");
  }
}

is_bin_true();

let path = process.env.PATH.split(":");

path = path.filter(path => path === `${home}/bin`);

function is_path_true() {
  if (path.length === 0) {
    shell.exec("echo 'export PATH=$PATH:$HOME/bin' >> .bashrc.bak");
    shell.exec(`source ${home}/.bashrc`);
    console.log("Path was created successfully.");
  } else {
    console.log("Path exists.");
  }
}

is_path_true();

process.chdir(`${home}/bin`);

const hello = shell.exec("ls -a | grep hello").code === 0 ? true : false;

const message = `#!/bin/bash\necho "Hey, buddy! I just wrote a program, that wrote a bash script on your machine! Enjoy!"`;

function write_script() {
  if (hello) {
    console.log("Program is complete. Type 'hello' in your terminal");
  } else {
    shell.exec(`echo "${message}" >> hello`);

    shell.exec("chmod 755 hello");

    console.log("Program is complete. Type 'hello' in your terminal");
  }
}

process.exit();
