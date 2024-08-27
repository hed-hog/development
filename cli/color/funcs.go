package color

func Red(text string) string {
	return "\033[31m" + text + "\033[0m"
}

func Green(text string) string {
	return "\033[32m" + text + "\033[0m"
}

func Yellow(text string) string {
	return "\033[33m" + text + "\033[0m"
}

func Blue(text string) string {
	return "\033[34m" + text + "\033[0m"
}

func Magenta(text string) string {
	return "\033[35m" + text + "\033[0m"
}

func Cyan(text string) string {
	return "\033[36m" + text + "\033[0m"
}

func White(text string) string {
	return "\033[37m" + text + "\033[0m"
}