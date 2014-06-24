module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['typescript', 'cssmin']);

  grunt.initConfig({
    typescript: {
      base: {
        src: ['lib/ICloneable.ts',
              'lib/GameManager.ts',
              'lib/GameScreen.ts',
              'lib/GameObject.ts',
              'lib/FPSDisplay.ts',
              'lib/Line.ts',
              'lib/Vector3.ts',
              'lib/Plane.ts',
              'lib/Matrix4.ts',
              'lib/Camera.ts',
              'lib/Mesh.ts',
              'lib/Object3D.ts',
              'lib/Mesh/Cube.ts',
              'lib/Mesh/Pyramid.ts',
              'lib/Mesh/Circle.ts',
              'lib/Mesh/Crater.ts',
              'lib/LineClipping.ts',
              'game/Mesh/Crater.ts',
              'game/Mesh/Terrain.ts',
              'game/Mesh/Tank.ts',
              'game/Player.ts',
              'game/Game.ts',
              'game/CollisionTester.ts',
              'lib/Keyboard.ts',
              'lib/Renderer.ts'

        ],
        dest: 'js/compiled.js',
        target: 'ES5',
        options: {
            'module': 'commonjs',
            'sourceMap': true
        }
      }
    },
    watch: {
      scripts: {
        files: ['lib/*.ts', 'style/*.css'],
        tasks: ['default']
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '',
        src: ['css/*.css', 'css/!*.min.css'],
        dest: '',
        ext: '.min.css'
      }
    }
  });
};

/*grunt init
npm install grunt-typescript --save-dev
npm install grunt-rename --save-dev
npm install grunt-contrib-cssmin --save-dev
npm install grunt-contrib-watch --save-dev*/