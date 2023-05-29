
class MissingMainError extends Error {
    constructor() {
        super(MISSING_MAIN_ERROR_MESSAGE)
        this.name = ERROR_NAME
    }
}



class InvalidMainError extends Error {
    constructor() {
        super(INVALID_MAIN_ERROR_MESSAGE)
        this.name = ERROR_NAME
    }
}



