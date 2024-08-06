package cmd

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/go-git/go-git/v5"
	"github.com/spf13/cobra"
)

const repoURL = "https://github.com/hcodev/hadsys-tpl"

// newCmd represents the new command
var newCmd = &cobra.Command{
	Use:   "new [project name]",
	Short: "Creates a new Hadsys project.",
	Long: `The "new" command initializes a new Hadsys project with the necessary structure and configuration.
This command sets up the basic files and directories required to start a Hadsys project, ensuring that you have a standardized environment to build upon. 
It simplifies the initial setup process, allowing you to focus on developing your project right away.`,
	Args: cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
			projectName := args[0]
			
			if err := createNewProject(projectName, repoURL); err != nil {
					fmt.Printf("Error creating project: %s\n", err)
			} else {
					fmt.Printf("New Hadsys project '%s' created successfully.\n", projectName)
			}
	},
}

func init() {
	rootCmd.AddCommand(newCmd)
}

func createNewProject(name, repoURL string) error {
	projectDir := filepath.Join(".", name)

	// Clonar o repositório
	fmt.Println("Cloning repository...")
	_, err := git.PlainClone(projectDir, false, &git.CloneOptions{
			URL:      repoURL,
			Progress: os.Stdout,
	})
	if err != nil {
			return fmt.Errorf("failed to clone repository: %w", err)
	}
	
	// Remover a referência ao repositório original
	gitDir := filepath.Join(projectDir, ".git")
	if err := os.RemoveAll(gitDir); err != nil {
			return fmt.Errorf("failed to remove .git directory: %w", err)
	}

	// Inicializar um novo repositório Git
	fmt.Println("Initializing new git repository...")
	repo, err := git.PlainInit(projectDir, false)
	if err != nil {
			return fmt.Errorf("failed to initialize new git repository: %w", err)
	}

	// Adicionar os arquivos ao novo repositório
	wt, err := repo.Worktree()
	if err != nil {
			return fmt.Errorf("failed to get worktree: %w", err)
	}

	if err := wt.AddGlob("."); err != nil {
			return fmt.Errorf("failed to add files to new git repository: %w", err)
	}

	// Fazer o primeiro commit
	_, err = wt.Commit("Initial commit", &git.CommitOptions{})
	if err != nil {
			return fmt.Errorf("failed to commit initial files: %w", err)
	}

	fmt.Println("New Hadsys project created successfully.")
	return nil
}