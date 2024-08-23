package cmd

import (
	"fmt"
	"os/exec"
	"bufio"
	"io/ioutil"
	"strings"
	"os"
	"path/filepath"
	"regexp"

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
			} else {
					fmt.Printf("New Hadsys project '%s' created successfully.\n", moduleName)
			}
	},
}

func init() {
	rootCmd.AddCommand(addCmd)
}

func installNpmPackage(packageName string) error {

	fmt.Println("Instalando pacote npm:", packageName)
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

	fmt.Println("Procurando módulo:", name)

	// Definir o caminho relativo onde o arquivo deve estar
	searchPath := fmt.Sprintf("node_modules/@hedhog/%s/dist/%s.module.js", name, name)

	fmt.Println("Caminho de busca:", searchPath)

	// Obter o diretório atual
	currentDir, err := os.Getwd()
	if err != nil {
		return "", err
	}

	fmt.Println("Diretório atual:", currentDir)

	// Construir o caminho completo
	fullPath := filepath.Join(currentDir, searchPath)

	fmt.Println("Caminho completo:", fullPath)

	// Verificar se o arquivo existe
	if _, err := os.Stat(fullPath); err == nil {
		return fullPath, nil
	} else if os.IsNotExist(err) {
		return "", nil // Arquivo não encontrado
	} else {
		return "", err // Outro erro
	}
}

func addModuleImports(filePath, moduleName string) error {

	// Ler o conteúdo do arquivo
	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		return err
	}

	// Converter o conteúdo para string
	script := string(content)

	// Expressão regular para encontrar o array de imports
	importsRegex := regexp.MustCompile(`imports:\s*\[(.*?)\]`)
	// Expressão regular para verificar se AuthModule já está presente
	authModuleRegex := regexp.MustCompile(moduleName)

	// Encontrar a seção de imports
	matches := importsRegex.FindStringSubmatch(script)
	if len(matches) < 2 {
		return fmt.Errorf("não foi possível encontrar a seção de imports no arquivo %s", filePath)
	}

	importsSection := matches[1]

	// Verificar se AuthModule já está presente
	if !authModuleRegex.MatchString(importsSection) {
		// Adicionar AuthModule
		newImportsSection := strings.TrimSpace(importsSection) + ",\n    " + moduleName
		// Substituir no script original
		script = strings.Replace(script, importsSection, newImportsSection, 1)
	}

	// Escrever o script modificado de volta ao arquivo
	err = ioutil.WriteFile(filePath, []byte(script), 0644)
	if err != nil {
		return fmt.Errorf("erro ao escrever no arquivo: %v", err)
	}

	return nil
}

func addModule(name string) error {

	appModuleFileName := "app.module.ts"
	appModuleFilePath := filepath.Join(".", "src", appModuleFileName)
	newModule := strings.Title(name) + "Module"

	fmt.Println("Adicionando módulo:", newModule)
	fmt.Println("Arquivo de módulo:", appModuleFilePath)

	if _, err := os.Stat(appModuleFilePath); os.IsNotExist(err) {
		return fmt.Errorf("file %s not found", appModuleFilePath)
	}

	packageName := "@hedhog/" + name

	err := installNpmPackage(packageName)
	if err != nil {
		fmt.Println("Erro ao instalar o pacote:", err)
	} else {
		fmt.Println("Pacote instalado com sucesso!")
	}

	modulePath, findErr := findModule(name)
	if findErr != nil {
		return findErr
	}

	fmt.Println("Module Path: ", modulePath)

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
		}

		// Check if the module is already in the list of modules
		if strings.Contains(line, newModule) && strings.Contains(line, "modules:") {
			moduleFound = true
		}

		// Find the line with the list of modules and add the new module
		if strings.Contains(line, "modules: [") && !moduleFound {
			line = strings.TrimRight(line, "]") + ", " + newModule + "]"
			moduleFound = true
		}

		lines = append(lines, line)
	}

	// If the import was not found, add it at the top of the file
	if !importFound {
		lines = append([]string{"import { " + newModule + " } from '" + packageName + "';"}, lines...)
	}

	// If the module was not found, add it to the list of modules
	if !moduleFound {
		
		if err := addModuleImports(appModuleFilePath, newModule); err != nil {
			return err
		}

	}

	if err := scanner.Err(); err != nil {
		return err
	}

	// Write the updated content back to the file
	return ioutil.WriteFile(appModuleFilePath, []byte(strings.Join(lines, "\n")), 0644)

	return nil
}