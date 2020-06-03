import os


def usPopen(cmd):
    os.popen(cmd)
    output = stream.read()
    print(output)


def main():
    usPopen('rm *.js')
    usPopen('tsc *.ts')


if __name__ == "__main__":
    main()
