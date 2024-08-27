package cmd

import (
	"bufio"
	"fmt"
	"hadsys/color"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/spf13/cobra"
)

var addCmd = &cobra.Command{
	Use:   "add [module name]",
	Short: "Add module.",
	Long: `The "add" command add a module to the project.`,
	Args: cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		moduleName := args[0]
		
		if err := addModule(moduleName); err != nil {
			fmt.Printf("Error creating project: %s\n", err)
		}
	},
}

func init() {
	rootCmd.AddCommand(addCmd)
}

func copyMigrationFiles(packageName string) error {

	// Copiar os arquivos de migração
	fmt.Println(color.Yellow("Copiando arquivos de migração..."))

	// Obtenha o diretorio atual
	currentDir, err := os.Getwd()
	if err != nil {
		return err
	}

	// Verificando se existe o arquivo de migração
	migrationFilePath := filepath.Join(currentDir, "node_modules", packageName, "src", "migration", "index.ts")

	// Verfica se o arquivo de migração existe
	if _, err := os.Stat(migrationFilePath); os.IsNotExist(err) {
		fmt.Println(color.Red("Arquivo de migração não encontrado!"))
		return fmt.Errorf("arquivo de migração não encontrado: %v", err)
	}
		
	// Crie uma variavel string com o timestamp atual em segundos 
	// Obtém o tempo atual
	now := time.Now()

	// Timestamp em milissegundos
	timestampMillis := now.UnixNano() / int64(time.Millisecond)

	timestamp := strconv.FormatInt(timestampMillis, 10)

	// Path de destino
	migrationDestPath := filepath.Join(currentDir, "src", "typeorm", "migrations", timestamp + "-migrate.ts")

	// Copiar o arquivo de migração
	err = copyFile(migrationFilePath, migrationDestPath)

	if err != nil {
		fmt.Println(color.Red("Falha ao copiar arquivo de migração!"))
		return fmt.Errorf("falha ao copiar arquivo de migração: %v", err)
	}

	// Abre arquivo de destino com acesso de escrita
	file, err := os.Open(migrationDestPath)
	if err != nil {
		return fmt.Errorf("erro ao abrir o arquivo: %v", err)
	}
	defer file.Close()

	var lines []string
	// Procura pela linha com conteudo: export class Migration
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		if strings.Contains(line, "export class Migration") {
			line = strings.Replace(line, "Migration", "Migration" + timestamp, 1)	
		}

		lines = append(lines, line)
	}

	// Verifica erros na leitura do arquivo
	if err := scanner.Err(); err != nil {
		fmt.Println(color.Red("Erro ao ler o arquivo!"))
		return fmt.Errorf("erro ao ler o arquivo: %v", err)
	}

	// Reabre o arquivo para escrita
	file, err = os.Create(migrationDestPath)
	if err != nil {
		fmt.Println(color.Red("Erro ao abrir o arquivo para escrita!"))
		return fmt.Errorf("erro ao abrir o arquivo para escrita: %v", err)
	}
	defer file.Close()

	// Escreve o conteúdo de volta ao arquivo
	writer := bufio.NewWriter(file)
	for _, line := range lines {
		_, err = writer.WriteString(line + "\n")
		if err != nil {
			fmt.Println(color.Red("Erro ao escrever no arquivo!"))
			return fmt.Errorf("erro ao escrever no arquivo: %v", err)
		}
	}

	writer.Flush()

	fmt.Println(color.Green("Arquivos de migração copiados com sucesso!"))

	return nil

}

func copyFile(sourcePath, destinationPath string) error {
	sourceFile, err := os.Open(sourcePath)
	if err != nil {
		return fmt.Errorf("failed to open source file: %v", err)
	}
	defer sourceFile.Close()

	destinationFile, err := os.Create(destinationPath)
	if err != nil {
		return fmt.Errorf("failed to create destination file: %v", err)
	}
	defer destinationFile.Close()

	_, err = io.Copy(destinationFile, sourceFile)
	if err != nil {
		return fmt.Errorf("failed to copy file: %v", err)
	}

	return nil
}

func installNpmPackage(packageName string) error {

	// Comando npm install
	cmd := exec.Command("npm", "install", packageName)

	// Captura a saída do comando
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("falha ao executar npm install: %v. Saída: %s", err, string(output))
	}

	fmt.Println(string(output))
	return nil
}

func findModule(name string) (string, error) {

	// Definir o caminho relativo onde o arquivo deve estar
	searchPath := fmt.Sprintf("node_modules/@hedhog/%s/dist/%s.module.js", name, name)

	// Obter o diretório atual
	currentDir, err := os.Getwd()
	if err != nil {
		return "", err
	}

	// Construir o caminho completo
	fullPath := filepath.Join(currentDir, searchPath)

	// Verificar se o arquivo existe
	if _, err := os.Stat(fullPath); err == nil {
		return fullPath, nil
	} else if os.IsNotExist(err) {
		return "", nil // Arquivo não encontrado
	} else {
		return "", err // Outro erro
	}
}

// Formata um arquivo TypeScript
func formatFile(filePath string) error {

	// Comando npm run format
	cmd := exec.Command("npm", "run", "format", filePath)

	// Captura a saída do comando
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("falha ao executar npm run format: %v. Saída: %s", err, string(output))
	}

	fmt.Println(string(output))
	return nil

}


// Adiciona um módulo ao array de imports do decorador @Module
func AddModuleToNestJS(filePath, moduleName string) error {	

	formatFile(filePath)

	// Abrir o arquivo para leitura
	file, err := os.Open(filePath)
	if err != nil {
		return fmt.Errorf("erro ao abrir o arquivo: %v", err)
	}
	defer file.Close()

	// Ler o conteúdo do arquivo linha por linha
	var lines []string
	moduleInserted := false

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		// Verifica se está no array de imports do @Module
		if strings.Contains(line, "imports:") && !moduleInserted {
			line = insertModuleInImports(line, moduleName)
			moduleInserted = true
		}

		lines = append(lines, line)
	}

	// Verifica erros na leitura do arquivo
	if err := scanner.Err(); err != nil {
		return fmt.Errorf("erro ao ler o arquivo: %v", err)
	}

	// Reabre o arquivo para escrita
	file, err = os.Create(filePath)
	if err != nil {
		return fmt.Errorf("erro ao abrir o arquivo para escrita: %v", err)
	}
	defer file.Close()

	// Escreve o conteúdo de volta ao arquivo
	writer := bufio.NewWriter(file)
	for _, line := range lines {
		_, err = writer.WriteString(line + "\n")
		if err != nil {
			return fmt.Errorf("erro ao escrever no arquivo: %v", err)
		}
	}

	writer.Flush()

	return nil
}

// Função que insere o módulo no array de imports
func insertModuleInImports(line, moduleName string) string {

	line = strings.TrimSpace(line)
	if strings.HasSuffix(line, "]") {
		line = strings.TrimSuffix(line, "]") + ", " + moduleName + "]"
	} else {
		line += moduleName + ", "
	}

	return line
}

func addModule(name string) error {

	appModuleFileName := "app.module.ts"
	appModuleFilePath := filepath.Join(".", "src", appModuleFileName)
	newModule := strings.Title(name) + "Module"

	if _, err := os.Stat(appModuleFilePath); os.IsNotExist(err) {
		return fmt.Errorf("file %s not found", appModuleFilePath)
	}

	packageName := "@hedhog/" + name

	fmt.Println(color.Cyan("Instalando o pacote: ") + color.Yellow(packageName))

	err := installNpmPackage(packageName)
	if err != nil {
		fmt.Println("Erro ao instalar o pacote:", err)
	} else {
		fmt.Println(color.Green("Pacote instalado com sucesso!"))
	}

	modulePath, findErr := findModule(name)
	if findErr != nil {
		return findErr
	}

	if modulePath == "" {
		return fmt.Errorf("module %s not found", name)
	}	

	file, err := os.Open(appModuleFilePath)
	if err != nil {
		return err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var lines []string
	importFound := false
	moduleFound := false

	for scanner.Scan() {
		line := scanner.Text()

		// Check if the module is already imported
		if strings.Contains(line, newModule) && strings.Contains(line, "import") {
			importFound = true
			moduleFound = true
		}

		lines = append(lines, line)
	}

	// If the import was not found, add it at the top of the file
	if !importFound {
		lines = append([]string{"import { " + newModule + " } from '" + packageName + "';"}, lines...)
	}

	err = os.WriteFile(appModuleFilePath, []byte(strings.Join(lines, "\n")), 0644)
	if err != nil {
		return err
	}

	// If the module was not found, add it to the list of modules
	if !moduleFound {

		fmt.Println(color.Cyan("Adicionando módulo ao arquivo ") + color.Yellow(appModuleFileName))
		
		err := AddModuleToNestJS(appModuleFilePath, newModule)
		if err != nil {
			fmt.Println("Erro:", err)
		} else {
			fmt.Println(color.Green("Módulo adicionado com sucesso!"))
		}

		formatFile(appModuleFilePath)

	}

	err = copyMigrationFiles(packageName)
	if err != nil {
		fmt.Println(color.Red("Erro ao copiar arquivos de migração: " + err.Error()))
	}

	fmt.Println("")
	fmt.Println("************************************")
	fmt.Println("")
	fmt.Println(color.Blue("npm run migrate:up"))
	fmt.Println("")
	fmt.Println("************************************")
	fmt.Println("")

	return nil

}