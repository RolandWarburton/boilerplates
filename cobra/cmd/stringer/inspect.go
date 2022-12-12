package stringer

import (
	"fmt"

	"github.com/rolandwarburton/go-cobra/pkg/stringer"
	"github.com/spf13/cobra"
)

var onlyDigits bool

var inspectCmd = &cobra.Command{
	Use:   "inspect",
	Short: "Inspects a string",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		i := args[0]
		res, kind := stringer.Inspect(i, onlyDigits)
		fmt.Println(res)
		fmt.Println(kind)
	},
}

func init() {
	// value = default value
	inspectCmd.Flags().BoolVarP(&onlyDigits, "digits", "d", false, "count only digits")
	rootCmd.AddCommand(inspectCmd)
}
