package cmd

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"hadsys/color"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/go-git/go-git/v5"
	"github.com/spf13/cobra"
)

const repoURL = "https://github.com/hed-hog/bootstrap"

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

func generateRandomString(n int) string {
	// Cria um slice de bytes com tamanho n/2, já que cada byte será convertido em dois caracteres hexadecimais
	bytes := make([]byte, n/2)

	// Preenche o slice com bytes aleatórios
	_, err := rand.Read(bytes)
	if err != nil {
		return ""
	}

	// Converte os bytes em uma string hexadecimal
	return hex.EncodeToString(bytes)
}

func init() {
	rootCmd.AddCommand(newCmd)
}

func executeCommand(path string, command ...string) error {
	cmd := exec.Command(command[0], command[1:]...)
	cmd.Dir = path
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
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
		fmt.Println(color.Red("Failed to clone repository."))
		return fmt.Errorf("failed to clone repository: %w", err)
	}
	
	// Remover a referência ao repositório original
	gitDir := filepath.Join(projectDir, ".git")
	if err := os.RemoveAll(gitDir); err != nil {
		fmt.Println(color.Red("Failed to remove .git directory."))
			return fmt.Errorf("failed to remove .git directory: %w", err)
	}

	// Inicializar um novo repositório Git
	fmt.Println("Initializing new git repository...")
	repo, err := git.PlainInit(projectDir, false)
	if err != nil {
		fmt.Println(color.Red("Failed to initialize new git repository."))
			return fmt.Errorf("failed to initialize new git repository: %w", err)
	}

	// Adicionar os arquivos ao novo repositório
	wt, err := repo.Worktree()
	if err != nil {
		fmt.Println(color.Red("Failed to get worktree."))
			return fmt.Errorf("failed to get worktree: %w", err)
	}

	if err := wt.AddGlob("."); err != nil {
		fmt.Println(color.Red("Failed to add files to new git repository."))
			return fmt.Errorf("failed to add files to new git repository: %w", err)
	}

	// Fazer o primeiro commit
	_, err = wt.Commit("Initial commit", &git.CommitOptions{})
	if err != nil {
		fmt.Println(color.Red("Failed to commit initial files."))
			return fmt.Errorf("failed to commit initial files: %w", err)
	}

	// gerar uma string com 32 caracteres aleatórios e colocar em uma variavel
	generatedString := generateRandomString(32)

	// Criar arquivo .env e definir o conteúdo padrão
	envFile := filepath.Join(projectDir, ".env")
	if err := os.WriteFile(envFile, []byte("DB_HOST=\"localhost\"\nDB_PORT=\"5432\"\nDB_USERNAME=\"root\"\nDB_PASSWORD=\"root\"\nDB_DATABASE=\"hedhog\"\nDATABASE_URL=\"postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}\"\n\nJWT_SECRET=\"" + generatedString + "\""), 0644); err != nil {
		fmt.Println(color.Red("Failed to create .env file."))
			return fmt.Errorf("failed to create .env file: %w", err)
	}

	currentDir, err := os.Getwd()
	if err != nil {
		return err
	}

	projectDir = filepath.Join(currentDir, projectDir)

	fmt.Println("PATH: ", projectDir)

	// Executando npm install no diretório do projeto
	if err := executeCommand(projectDir, "npm", "install"); err != nil {
		fmt.Println(color.Red("Failed to install dependencies."))
			return fmt.Errorf("failed to install dependencies: %w", err)
	}

	// Executar o comando: hedhog add auth
	if err := executeCommand(projectDir, "hedhog", "add", "auth"); err != nil {
		fmt.Println(color.Red("Failed to add auth module."))
			return fmt.Errorf("failed to add auth module: %w", err)
	}

	fmt.Println("New HedHog project created successfully.")
	return nil
}