module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "../_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
