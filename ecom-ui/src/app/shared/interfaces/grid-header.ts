export default interface GridHeader { 
    dataType: string; 
    fieldName: string;
    displayName: string; 
    isSortable: boolean; 
    isFilterable: boolean; 
    isShow: boolean;
}

// Factory function to add default values
export const createGridHeader = (
    overrides: Partial<GridHeader> = {}
): GridHeader => {
    return {
        dataType: 'string',
        fieldName: 'defaultField',
        displayName: 'Default Display Name',
        isSortable: true,
        isFilterable: true,
        isShow: true,
        ...overrides
    };
};

// Example usage
// const header = createGridHeader({ fieldName: 'customField' });
