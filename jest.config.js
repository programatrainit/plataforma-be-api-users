module.exports = {
  everbose: true,
  testEnvironment: 'node',
  transform: { '^.+\\.ts?$': 'ts-jest' },
  globals: { NODE_ENV: 'test' },
  moduleNameMapper: {
    '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^@clients/(.*)$': '<rootDir>/src/clients/$1',
    '^@transformers/(.*)$': '<rootDir>/src/transformers/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/__tests__/$1',
  },
  collectCoverage: true,
  coverageReporters: ['json', 'text'],
  coverageDirectory: 'coverage/'
};
/*
 * explicacion del archivo de configuracion de Jest
 ===== testEnvironment: 'node' =======

  Esto especifica que las pruebas se ejecutarán en un entorno Node.js. Jest proporciona diferentes entornos de prueba, y 'node'
  es el entorno estándar para ejecutar pruebas en un entorno Node.js.

=====  transform: { '^.+\\.ts?$': 'ts-jest' } ==========

Define cómo Jest debe transformar (compilar) archivos TypeScript antes de ejecutar las pruebas. En este caso, se utiliza el transformador ts-jest
para manejar archivos TypeScript.'^.+\\.ts?$' esto no es mas que regax para decir no importa en nombre del archivo mientras termine en .ts

====== globals: { NODE_ENV: 'test' } ==========

Define variables globales que estarán disponibles durante la ejecución de las pruebas. En este caso, establece la variable de entorno NODE_ENV
en 'test'.

===== moduleNameMapper ======

Especifica mapeos de nombres de módulos para Jest. Esto es útil para crear alias a rutas más largas en tu código.

===== collectCoverage =====
 collectCoverage: true

Habilita la recopilación de información de cobertura durante la ejecución de las pruebas. La cobertura indica cuánto del código fuente está cubierto
por las pruebas.

==== coverageReporters y coverageDirectory ======

coverageReporters: ['json', 'text'], coverageDirectory: 'coverage/':

Especifica los informes de cobertura que se generarán. En este caso, se genera un informe en formato JSON y otro en formato de texto.
La carpeta coverage/ contendrá los informes generados.*/
