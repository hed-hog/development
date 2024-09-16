export declare const MESSAGES: {
    PROJECT_SELECTION_QUESTION: string;
    LIBRARY_PROJECT_SELECTION_QUESTION: string;
    DRY_RUN_MODE: string;
    PROJECT_INFORMATION_START: string;
    RUNNER_EXECUTION_ERROR: (command: string) => string;
    PACKAGE_MANAGER_QUESTION: string;
    PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS: string;
    PACKAGE_MANAGER_UPDATE_IN_PROGRESS: string;
    PACKAGE_MANAGER_UPGRADE_IN_PROGRESS: string;
    PACKAGE_MANAGER_PRODUCTION_INSTALLATION_IN_PROGRESS: string;
    GIT_INITIALIZATION_ERROR: string;
    PACKAGE_MANAGER_INSTALLATION_SUCCEED: (name: string) => string;
    ADD_MODULE_SUCCEED: (name: string) => string;
    CONFIG_DATABASE: string;
    GET_STARTED_INFORMATION: string;
    RUN_MIGRATE_COMMAND: string;
    CHANGE_DIR_COMMAND: (name: string) => string;
    START_COMMAND: (name: string) => string;
    PACKAGE_MANAGER_INSTALLATION_FAILED: (commandToRunManually: string) => string;
    HEDHOG_INFORMATION_PACKAGE_MANAGER_FAILED: string;
    HEDHOG_INFORMATION_PACKAGE_WARNING_FAILED: (dependencies: string[]) => string;
    LIBRARY_INSTALLATION_FAILED_BAD_PACKAGE: (name: string) => string;
    LIBRARY_INSTALLATION_FAILED_NO_LIBRARY: string;
    LIBRARY_INSTALLATION_STARTS: string;
};
