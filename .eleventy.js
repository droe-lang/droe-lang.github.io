module.exports = function (eleventyConfig) {
  // Copy robots.txt to output
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  
  // Add date filter for sitemap
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    const date = dateObj || new Date();
    return date.toISOString().split('T')[0];
  });

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
