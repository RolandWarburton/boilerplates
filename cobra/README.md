# Cobra Example Boilerplate

Based on the "Let's build a CLI in Go with Cobra" tutorial written by
[Thorsten Hans](https://www.thorsten-hans.com/lets-build-a-cli-in-go-with-cobra/).

If you would like to create your own version, you should **not** copy this folder verbatim,
instead bootstrap using the following to ensure you generate a new module name.

```none
# init the project
go mod init github.com/rolandwarburton/PROJECT_NAME

# Add cobra as a dependency
go get -u github.com/spf13/cobra@latest
```

Then copy in `cmd/`, `pkg/`, and `main.go`

## Project Structure

`pkg` contains a simple project that `cmd` wraps with a cli.

```none
/
├── pkg
│   └── .
└── cmd
    └── stringer
        ├── inspect.go
        ├── reverse.go
        └── root.go
```

## How Are Commands Structured

The interesting parts are inside `cmd/stringer/`.

`cmd/stringer/root.go` defines the basic command as if its run without any arguments. For example
a description of the command, and what positional arguments it can take are printed here.
This information is stored in `rootCmd` in the `root.go` file.

`root.go` contains a variable called `rootCmd` that other commands
such as the ones in `inspect.go` and `reverse.go` can append to using `rootCmd.AddCommand()`

Arguments with `-` or `--` can be defined to belong to a positional argument (no dashes)
by defining them on the command in `inspect.go` and `reverse.go`
(see `inspectCmd.Flags()` in `inspect.go`).

Cobra encourages POSIX compliant way of defining commands. For example a command may contain
`myCommand positional --arg` in which a dashed argument belongs to a positional argument.

## Creating New Commands

The painless way to do this is using the `cobra-cli` tool to generate new code for example commands.

```none
go install github.com/spf13/cobra-cli@latest
```

Then read the [cobra cli generator docs](https://github.com/spf13/cobra-cli/blob/main/README.md).

To use the code generator type your command after `cobra-cli add`.

```none
# create a command for: `config`
cobra-cli add config
```

If you would like to add additional flags, for example to create `config --file` instead,
then you need to add these after the running the command manually, see `inspect.go` for an example.
