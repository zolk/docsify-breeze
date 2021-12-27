export default {
  litelement: true,
  outdir: './dist',
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*.test.ts'],
  plugins: [
    {
      name: 'custom-tags',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration:
            const customTags = ['status'];
            const className = node.name.getText();

            node.jsDoc?.forEach((jsDoc) => {
              jsDoc?.tags?.forEach((tag) => {
                const tagName = tag.tagName.getText();

                if (customTags.includes(tagName)) {
                  const classDeclaration = moduleDoc.declarations.find(
                    (declaration) => declaration.name === className
                  );
                  classDeclaration[tagName] = tag.comment;
                }
              });
            });
        }
      },
    },
  ],
};
