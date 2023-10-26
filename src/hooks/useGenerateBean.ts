
export const useGenerateBean = (properties: Record<string, any>, path?: string, className?: string) => {
    //const [className, setClassName] = useState<string>('');

    let xml = `<bean class="${path}.${className}">\n`;

    for (const propertyName in properties) {
        if (properties.hasOwnProperty(propertyName)) {
            const propertyValue = properties[propertyName];
            const propertyType = typeof propertyValue;
            const classNameAux = `${propertyName[0].toUpperCase() + propertyName.slice(1)}DTO`;
            //setClassName(`${propertyName[0].toUpperCase() + propertyName.slice(1)}DTO`);

            if (propertyType === "object" && !Array.isArray(propertyValue)) {
                // Nested object
                xml += `    <property name="${propertyName}" type="${path}.${classNameAux}">\n`;
                xml += `        <annotations>\n`;
                xml += `            @JsonProperty("${propertyName}")\n`;
                xml += `        </annotations>\n`;
                xml += `    </property>\n`;

                // Recursively generate XML for the nested object
                //xml += generateBeanXml(`${beanName}.${propertyName}`, propertyValue);
            } else if (Array.isArray(propertyValue)) {
                // Array of objects
                if (propertyValue.length > 0 && typeof propertyValue[0] === "object") {
                    //const elementType = Object.keys(propertyValue[0])[0];
                    xml += `<property name="${propertyName}" type="java.util.List&alt;${path}.${classNameAux}>">\n`;
                    xml += `    <annotations>\n`;
                    xml += `        @JsonProperty("${propertyName}")\n`;
                    xml += `    </annotations>\n`;
                    xml += `</property>\n`;

                    // Recursively generate XML for the array elements
                    //xml += generateBeanXml(`${beanName}.${elementType}`, propertyValue[0]);
                }
            } else {
                // Primitive types
                if (propertyType === "string" || propertyType === "boolean") {
                    xml += `    <property name="${propertyName}" type="java.lang.${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}">\n`;
                    xml += `        <annotations>\n`;
                    xml += `            @JsonProperty("${propertyName}")\n`;
                    xml += `        </annotations>\n`;
                    xml += `    </property>\n`;
                } else if (Number.isInteger(propertyValue)) {
                    // Integer type
                    xml += `    <property name="${propertyName}" type="java.lang.Integer">\n`;
                    xml += `        <annotations>\n`;
                    xml += `            @JsonProperty("${propertyName}")\n`;
                    xml += `        </annotations>\n`;
                    xml += `    </property>\n`;
                } else if (Number(propertyValue) === propertyValue) {
                    // Double type
                    xml += `    <property name="${propertyName}" type="java.lang.Double">\n`;
                    xml += `        <annotations>\n`;
                    xml += `            @JsonProperty("${propertyName}")\n`;
                    xml += `        </annotations>\n`;
                    xml += `    </property>\n`;
                }
            }
        }
    }

    xml += `</bean>`;
    return xml;
}