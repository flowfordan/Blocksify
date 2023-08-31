(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[725],{4184:function(e,t){var n;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var a=r.apply(null,n);a&&e.push(a)}}else if("object"===o){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var s in n)i.call(n,s)&&n[s]&&e.push(s)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0!==(n=(function(){return r}).apply(t,[]))&&(e.exports=n)}()},4805:function(e,t,n){"use strict";n.d(t,{L1:function(){return P},YR:function(){return d},w_:function(){return O}});var i=n(9477);let r=window.THREE?window.THREE:{Box3:i.ZzF,BufferGeometry:i.u9r,Float32BufferAttribute:i.a$l,InstancedBufferGeometry:i.L5s,InstancedInterleavedBuffer:i.$TI,InterleavedBufferAttribute:i.kB5,Sphere:i.aLr,Vector3:i.Pa4,WireframeGeometry:i.Uk6};var o=new r.BufferGeometry().setAttribute?"setAttribute":"addAttribute";let a=new r.Box3,s=new r.Vector3;class l extends r.InstancedBufferGeometry{constructor(){super(),this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this[o]("position",new r.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this[o]("uv",new r.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new r.InstancedInterleavedBuffer(t,6,1);return this[o]("instanceStart",new r.InterleavedBufferAttribute(n,3,0)),this[o]("instanceEnd",new r.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new r.InstancedInterleavedBuffer(t,6,1);return this[o]("instanceColorStart",new r.InterleavedBufferAttribute(n,3,0)),this[o]("instanceColorEnd",new r.InterleavedBufferAttribute(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new r.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;if(t.isGeometry){console.error("LineSegmentsGeometry no longer supports Geometry. Use THREE.BufferGeometry instead.");return}return t.isBufferGeometry&&this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new r.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),a.setFromBufferAttribute(t),this.boundingBox.union(a))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new r.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)s.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(s)),s.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(s));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}l.prototype.isLineSegmentsGeometry=!0;let c=window.THREE?window.THREE:{ShaderLib:i.Vj0,ShaderMaterial:i.jyz,UniformsLib:i.rBU,UniformsUtils:i.rDY,Vector2:i.FM8};c.UniformsLib.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new c.Vector2(1,1)},dashScale:{value:1},dashSize:{value:1},dashOffset:{value:0},gapSize:{value:1}},c.ShaderLib.line={uniforms:c.UniformsUtils.merge([c.UniformsLib.common,c.UniformsLib.fog,c.UniformsLib.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		varying vec2 vUv;
		varying vec4 worldPos;
		varying vec3 worldStart;
		varying vec3 worldEnd;

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			vUv = uv;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			worldStart = start.xyz;
			worldEnd = end.xyz;

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				// get the offset direction as perpendicular to the view vector
				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 offset;
				if ( position.y < 0.5 ) {

					offset = normalize( cross( start.xyz, worldDir ) );

				} else {

					offset = normalize( cross( end.xyz, worldDir ) );

				}

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// extend the line bounds to encompass  endcaps
					start.xyz += - worldDir * linewidth * 0.5;
					end.xyz += worldDir * linewidth * 0.5;

					// shift the position of the quad so it hugs the forward edge of the line
					offset.xy -= dir * forwardOffset;
					offset.z += 0.5;

				#endif

				// endcaps
				if ( position.y > 1.0 || position.y < 0.0 ) {

					offset.xy += dir * 2.0 * forwardOffset;

				}

				// adjust for linewidth
				offset *= linewidth * 0.5;

				// set the world position
				worldPos = ( position.y < 0.5 ) ? start : end;
				worldPos.xyz += offset;

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segements overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

			vec2 offset = vec2( dir.y, - dir.x );
			// undo aspect ratio adjustment
			dir.x /= aspect;
			offset.x /= aspect;

			// sign flip
			if ( position.x < 0.0 ) offset *= - 1.0;

			// endcaps
			if ( position.y < 0.0 ) {

				offset += - dir;

			} else if ( position.y > 1.0 ) {

				offset += dir;

			}

			// adjust for linewidth
			offset *= linewidth;

			// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
			offset /= resolution.y;

			// select end
			vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

			// back to clip space
			offset *= clip.w;

			clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;
		varying vec4 worldPos;
		varying vec3 worldStart;
		varying vec3 worldEnd;

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		varying vec2 vUv;

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

			#endif

			#else

				#ifdef ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

			if ( abs( vUv.y ) > 1.0 ) {

				float a = vUv.x;
				float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
				float len2 = a * a + b * b;

				if ( len2 > 1.0 ) discard;

			}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class d extends c.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:c.UniformsUtils.clone(c.ShaderLib.line.uniforms),vertexShader:c.ShaderLib.line.vertexShader,fragmentShader:c.ShaderLib.line.fragmentShader,clipping:!0}),Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}d.prototype.isLineMaterial=!0;let u=window.THREE?window.THREE:{Box3:i.ZzF,BufferGeometry:i.u9r,InstancedInterleavedBuffer:i.$TI,InterleavedBufferAttribute:i.kB5,Line3:i.Zzh,MathUtils:i.M8C,Matrix4:i.yGw,Mesh:i.Kj0,Sphere:i.aLr,Vector3:i.Pa4,Vector4:i.Ltg};var p=new u.BufferGeometry().setAttribute?"setAttribute":"addAttribute";let f=new u.Vector3,m=new u.Vector3,h=new u.Vector4,y=new u.Vector4,v=new u.Vector4,b=new u.Vector3,g=new u.Matrix4,w=new u.Line3,x=new u.Vector3,S=new u.Box3,E=new u.Sphere,A=new u.Vector4;class M extends u.Mesh{constructor(e=new l,t=new d({color:16777215*Math.random()})){super(e,t),this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,o=t.count;e<o;e++,r+=2)f.fromBufferAttribute(t,e),m.fromBufferAttribute(n,e),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+f.distanceTo(m);let r=new u.InstancedInterleavedBuffer(i,2,1);return e[p]("instanceDistanceStart",new u.InterleavedBufferAttribute(r,1,0)),e[p]("instanceDistanceEnd",new u.InterleavedBufferAttribute(r,1,1)),this}raycast(e,t){null===e.camera&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2.');let n=void 0!==e.params.Line2&&e.params.Line2.threshold||0,i=e.ray,r=e.camera,o=r.projectionMatrix,a=this.matrixWorld,s=this.geometry,l=this.material,c=l.resolution,d=l.linewidth+n,p=s.attributes.instanceStart,f=s.attributes.instanceEnd,m=-r.near,M=2*Math.max(d/c.width,d/c.height);null===s.boundingSphere&&s.computeBoundingSphere(),E.copy(s.boundingSphere).applyMatrix4(a);let P=Math.max(r.near,E.distanceToPoint(i.origin));A.set(0,0,-P,1).applyMatrix4(r.projectionMatrix),A.multiplyScalar(1/A.w),A.applyMatrix4(r.projectionMatrixInverse);let O=.5*Math.abs(M/A.w);if(E.radius+=O,!1===e.ray.intersectsSphere(E))return;null===s.boundingBox&&s.computeBoundingBox(),S.copy(s.boundingBox).applyMatrix4(a);let L=Math.max(r.near,S.distanceToPoint(i.origin));A.set(0,0,-L,1).applyMatrix4(r.projectionMatrix),A.multiplyScalar(1/A.w),A.applyMatrix4(r.projectionMatrixInverse);let T=.5*Math.abs(M/A.w);if(S.max.x+=T,S.max.y+=T,S.max.z+=T,S.min.x-=T,S.min.y-=T,S.min.z-=T,!1!==e.ray.intersectsBox(S)){i.at(1,v),v.w=1,v.applyMatrix4(r.matrixWorldInverse),v.applyMatrix4(o),v.multiplyScalar(1/v.w),v.x*=c.x/2,v.y*=c.y/2,v.z=0,b.copy(v),g.multiplyMatrices(r.matrixWorldInverse,a);for(let e=0,n=p.count;e<n;e++){if(h.fromBufferAttribute(p,e),y.fromBufferAttribute(f,e),h.w=1,y.w=1,h.applyMatrix4(g),y.applyMatrix4(g),h.z>m&&y.z>m)continue;if(h.z>m){let e=h.z-y.z,t=(h.z-m)/e;h.lerp(y,t)}else if(y.z>m){let e=y.z-h.z,t=(y.z-m)/e;y.lerp(h,t)}h.applyMatrix4(o),y.applyMatrix4(o),h.multiplyScalar(1/h.w),y.multiplyScalar(1/y.w),h.x*=c.x/2,h.y*=c.y/2,y.x*=c.x/2,y.y*=c.y/2,w.start.copy(h),w.start.z=0,w.end.copy(y),w.end.z=0;let n=w.closestPointToPointParameter(b,!0);w.at(n,x);let r=u.MathUtils.lerp(h.z,y.z,n),s=r>=-1&&r<=1,l=b.distanceTo(x)<.5*d;if(s&&l){w.start.fromBufferAttribute(p,e),w.end.fromBufferAttribute(f,e),w.start.applyMatrix4(a),w.end.applyMatrix4(a);let n=new u.Vector3,r=new u.Vector3;i.distanceSqToSegment(w.start,w.end,r,n),t.push({point:r,pointOnLine:n,distance:i.origin.distanceTo(r),object:this,face:null,faceIndex:e,uv:null,uv2:null})}}}}}M.prototype.LineSegments2=!0;class P extends l{constructor(){super(),this.type="LineGeometry"}setPositions(e){for(var t=e.length-3,n=new Float32Array(2*t),i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){for(var t=e.length-3,n=new Float32Array(2*t),i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}fromLine(e){var t=e.geometry;if(t.isGeometry){console.error("THREE.LineGeometry no longer supports Geometry. Use THREE.BufferGeometry instead.");return}return t.isBufferGeometry&&this.setPositions(t.attributes.position.array),this}}P.prototype.isLineGeometry=!0;class O extends M{constructor(e=new P,t=new d({color:16777215*Math.random()})){super(e,t),this.type="Line2"}}O.prototype.isLine2=!0},7669:function(e,t,n){"use strict";n.d(t,{_:function(){return r}});var i=n(4165);function r(e,t,n){return(r="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=(0,i.X)(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n||e):o.value}})(e,t,n||e)}},9365:function(e,t,n){"use strict";n.d(t,{z:function(){return s}});var i=n(9477);let r={type:"change"},o={type:"start"},a={type:"end"};class s extends i.pBf{constructor(e,t){super(),void 0===t&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new i.Pa4,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:i.RsA.ROTATE,MIDDLE:i.RsA.DOLLY,RIGHT:i.RsA.PAN},this.touches={ONE:i.QmN.ROTATE,TWO:i.QmN.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return d.phi},this.getAzimuthalAngle=function(){return d.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(e){e.addEventListener("keydown",W),this._domElementKeyEvents=e},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(r),n.update(),l=s.NONE},this.update=function(){let t=new i.Pa4,o=new i._fP().setFromUnitVectors(e.up,new i.Pa4(0,1,0)),a=o.clone().invert(),h=new i.Pa4,y=new i._fP,v=2*Math.PI;return function(){let e=n.object.position;t.copy(e).sub(n.target),t.applyQuaternion(o),d.setFromVector3(t),n.autoRotate&&l===s.NONE&&O(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(d.theta+=u.theta*n.dampingFactor,d.phi+=u.phi*n.dampingFactor):(d.theta+=u.theta,d.phi+=u.phi);let i=n.minAzimuthAngle,b=n.maxAzimuthAngle;return isFinite(i)&&isFinite(b)&&(i<-Math.PI?i+=v:i>Math.PI&&(i-=v),b<-Math.PI?b+=v:b>Math.PI&&(b-=v),i<=b?d.theta=Math.max(i,Math.min(b,d.theta)):d.theta=d.theta>(i+b)/2?Math.max(i,d.theta):Math.min(b,d.theta)),d.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,d.phi)),d.makeSafe(),d.radius*=p,d.radius=Math.max(n.minDistance,Math.min(n.maxDistance,d.radius)),!0===n.enableDamping?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),t.setFromSpherical(d),t.applyQuaternion(a),e.copy(n.target).add(t),n.object.lookAt(n.target),!0===n.enableDamping?(u.theta*=1-n.dampingFactor,u.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(u.set(0,0,0),f.set(0,0,0)),p=1,!!(m||h.distanceToSquared(n.object.position)>c||8*(1-y.dot(n.object.quaternion))>c)&&(n.dispatchEvent(r),h.copy(n.object.position),y.copy(n.object.quaternion),m=!1,!0)}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Z),n.domElement.removeEventListener("pointerdown",k),n.domElement.removeEventListener("pointercancel",V),n.domElement.removeEventListener("wheel",Y),n.domElement.removeEventListener("pointermove",F),n.domElement.removeEventListener("pointerup",G),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",W)};let n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},l=s.NONE,c=1e-6,d=new i.$V,u=new i.$V,p=1,f=new i.Pa4,m=!1,h=new i.FM8,y=new i.FM8,v=new i.FM8,b=new i.FM8,g=new i.FM8,w=new i.FM8,x=new i.FM8,S=new i.FM8,E=new i.FM8,A=[],M={};function P(){return Math.pow(.95,n.zoomSpeed)}function O(e){u.theta-=e}let L=function(){let e=new i.Pa4;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),f.add(e)}}(),T=function(){let e=new i.Pa4;return function(t,i){!0===n.screenSpacePanning?e.setFromMatrixColumn(i,1):(e.setFromMatrixColumn(i,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),f.add(e)}}(),z=function(){let e=new i.Pa4;return function(t,i){let r=n.domElement;if(n.object.isPerspectiveCamera){let o=n.object.position;e.copy(o).sub(n.target);let a=e.length();L(2*t*(a*=Math.tan(n.object.fov/2*Math.PI/180))/r.clientHeight,n.object.matrix),T(2*i*a/r.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(L(t*(n.object.right-n.object.left)/n.object.zoom/r.clientWidth,n.object.matrix),T(i*(n.object.top-n.object.bottom)/n.object.zoom/r.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function _(e){n.object.isPerspectiveCamera?p/=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*e)),n.object.updateProjectionMatrix(),m=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function j(e){n.object.isPerspectiveCamera?p*=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/e)),n.object.updateProjectionMatrix(),m=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function R(e){h.set(e.clientX,e.clientY)}function B(e){b.set(e.clientX,e.clientY)}function D(){if(1===A.length)h.set(A[0].pageX,A[0].pageY);else{let e=.5*(A[0].pageX+A[1].pageX),t=.5*(A[0].pageY+A[1].pageY);h.set(e,t)}}function N(){if(1===A.length)b.set(A[0].pageX,A[0].pageY);else{let e=.5*(A[0].pageX+A[1].pageX),t=.5*(A[0].pageY+A[1].pageY);b.set(e,t)}}function I(){let e=A[0].pageX-A[1].pageX,t=A[0].pageY-A[1].pageY;x.set(0,Math.sqrt(e*e+t*t))}function U(e){var t;if(1==A.length)y.set(e.pageX,e.pageY);else{let t=K(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);y.set(n,i)}v.subVectors(y,h).multiplyScalar(n.rotateSpeed);let i=n.domElement;O(2*Math.PI*v.x/i.clientHeight),t=2*Math.PI*v.y/i.clientHeight,u.phi-=t,h.copy(y)}function C(e){if(1===A.length)g.set(e.pageX,e.pageY);else{let t=K(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);g.set(n,i)}w.subVectors(g,b).multiplyScalar(n.panSpeed),z(w.x,w.y),b.copy(g)}function H(e){let t=K(e),i=e.pageX-t.x,r=e.pageY-t.y;S.set(0,Math.sqrt(i*i+r*r)),E.set(0,Math.pow(S.y/x.y,n.zoomSpeed)),_(E.y),x.copy(S)}function k(e){!1!==n.enabled&&(0===A.length&&(n.domElement.setPointerCapture(e.pointerId),n.domElement.addEventListener("pointermove",F),n.domElement.addEventListener("pointerup",G)),A.push(e),"touch"===e.pointerType?function(e){switch(q(e),A.length){case 1:switch(n.touches.ONE){case i.QmN.ROTATE:if(!1===n.enableRotate)return;D(),l=s.TOUCH_ROTATE;break;case i.QmN.PAN:if(!1===n.enablePan)return;N(),l=s.TOUCH_PAN;break;default:l=s.NONE}break;case 2:switch(n.touches.TWO){case i.QmN.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&I(),n.enablePan&&N(),l=s.TOUCH_DOLLY_PAN;break;case i.QmN.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&I(),n.enableRotate&&D(),l=s.TOUCH_DOLLY_ROTATE;break;default:l=s.NONE}break;default:l=s.NONE}l!==s.NONE&&n.dispatchEvent(o)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case i.RsA.DOLLY:if(!1===n.enableZoom)return;x.set(e.clientX,e.clientY),l=s.DOLLY;break;case i.RsA.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;B(e),l=s.PAN}else{if(!1===n.enableRotate)return;R(e),l=s.ROTATE}break;case i.RsA.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;R(e),l=s.ROTATE}else{if(!1===n.enablePan)return;B(e),l=s.PAN}break;default:l=s.NONE}l!==s.NONE&&n.dispatchEvent(o)}(e))}function F(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch(q(e),l){case s.TOUCH_ROTATE:if(!1===n.enableRotate)return;U(e),n.update();break;case s.TOUCH_PAN:if(!1===n.enablePan)return;C(e),n.update();break;case s.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&H(e),n.enablePan&&C(e),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&H(e),n.enableRotate&&U(e),n.update();break;default:l=s.NONE}}(e):function(e){if(!1!==n.enabled)switch(l){case s.ROTATE:if(!1===n.enableRotate)return;!function(e){var t;y.set(e.clientX,e.clientY),v.subVectors(y,h).multiplyScalar(n.rotateSpeed);let i=n.domElement;O(2*Math.PI*v.x/i.clientHeight),t=2*Math.PI*v.y/i.clientHeight,u.phi-=t,h.copy(y),n.update()}(e);break;case s.DOLLY:if(!1===n.enableZoom)return;S.set(e.clientX,e.clientY),E.subVectors(S,x),E.y>0?_(P()):E.y<0&&j(P()),x.copy(S),n.update();break;case s.PAN:if(!1===n.enablePan)return;g.set(e.clientX,e.clientY),w.subVectors(g,b).multiplyScalar(n.panSpeed),z(w.x,w.y),b.copy(g),n.update()}}(e))}function G(e){X(e),0===A.length&&(n.domElement.releasePointerCapture(e.pointerId),n.domElement.removeEventListener("pointermove",F),n.domElement.removeEventListener("pointerup",G)),n.dispatchEvent(a),l=s.NONE}function V(e){X(e)}function Y(e){!1!==n.enabled&&!1!==n.enableZoom&&l===s.NONE&&(e.preventDefault(),n.dispatchEvent(o),e.deltaY<0?j(P()):e.deltaY>0&&_(P()),n.update(),n.dispatchEvent(a))}function W(e){!1!==n.enabled&&!1!==n.enablePan&&function(e){let t=!1;switch(e.code){case n.keys.UP:z(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:z(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:z(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:z(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}(e)}function Z(e){!1!==n.enabled&&e.preventDefault()}function X(e){delete M[e.pointerId];for(let t=0;t<A.length;t++)if(A[t].pointerId==e.pointerId){A.splice(t,1);return}}function q(e){let t=M[e.pointerId];void 0===t&&(t=new i.FM8,M[e.pointerId]=t),t.set(e.pageX,e.pageY)}function K(e){let t=e.pointerId===A[0].pointerId?A[1]:A[0];return M[t.pointerId]}n.domElement.addEventListener("contextmenu",Z),n.domElement.addEventListener("pointerdown",k),n.domElement.addEventListener("pointercancel",V),n.domElement.addEventListener("wheel",Y,{passive:!1}),this.update()}}},5079:function(e,t){"use strict";var n=function(){var e=0,t=document.createElement("div");function i(e){return t.appendChild(e.dom),e}function r(n){for(var i=0;i<t.children.length;i++)t.children[i].style.display=i===n?"block":"none";e=n}t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",function(n){n.preventDefault(),r(++e%t.children.length)},!1);var o=(performance||Date).now(),a=o,s=0,l=i(new n.Panel("FPS","#0ff","#002")),c=i(new n.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=i(new n.Panel("MB","#f08","#201"));return r(0),{REVISION:16,dom:t,addPanel:i,showPanel:r,begin:function(){o=(performance||Date).now()},end:function(){s++;var e=(performance||Date).now();if(c.update(e-o,200),e>=a+1e3&&(l.update(1e3*s/(e-a),100),a=e,s=0,d)){var t=performance.memory;d.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){o=this.end()},domElement:t,setMode:r}};n.Panel=function(e,t,n){var i=1/0,r=0,o=Math.round,a=o(window.devicePixelRatio||1),s=80*a,l=48*a,c=3*a,d=2*a,u=3*a,p=15*a,f=74*a,m=30*a,h=document.createElement("canvas");h.width=s,h.height=l,h.style.cssText="width:80px;height:48px";var y=h.getContext("2d");return y.font="bold "+9*a+"px Helvetica,Arial,sans-serif",y.textBaseline="top",y.fillStyle=n,y.fillRect(0,0,s,l),y.fillStyle=t,y.fillText(e,c,d),y.fillRect(u,p,f,m),y.fillStyle=n,y.globalAlpha=.9,y.fillRect(u,p,f,m),{dom:h,update:function(l,v){i=Math.min(i,l),r=Math.max(r,l),y.fillStyle=n,y.globalAlpha=1,y.fillRect(0,0,s,p),y.fillStyle=t,y.fillText(o(l)+" "+e+" ("+o(i)+"-"+o(r)+")",c,d),y.drawImage(h,u+a,p,f-a,m,u,p,f-a,m),y.fillRect(u+f-a,p,a,m),y.fillStyle=n,y.globalAlpha=.9,y.fillRect(u+f-a,p,a,o((1-l/v)*m))}}},t.Z=n},1764:function(e,t,n){"use strict";n.d(t,{M:function(){return d},j:function(){return r}});var i=n(9477);class r extends i.Tme{constructor(e=document.createElement("div")){super(),this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&null!==e.element.parentNode&&e.element.parentNode.removeChild(e.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this}}r.prototype.isCSS2DObject=!0;let o=new i.Pa4,a=new i.yGw,s=new i.yGw,l=new i.Pa4,c=new i.Pa4;class d{constructor(e={}){let t,n,i,r;let d=this,u={objects:new WeakMap},p=void 0!==e.element?e.element:document.createElement("div");p.style.overflow="hidden",this.domElement=p,this.getSize=function(){return{width:t,height:n}},this.render=function(e,t){!0===e.autoUpdate&&e.updateMatrixWorld(),null===t.parent&&t.updateMatrixWorld(),a.copy(t.matrixWorldInverse),s.multiplyMatrices(t.projectionMatrix,a),function e(t,n,a){if(t.isCSS2DObject){o.setFromMatrixPosition(t.matrixWorld),o.applyMatrix4(s);let e=!0===t.visible&&o.z>=-1&&o.z<=1&&!0===t.layers.test(a.layers);if(t.element.style.display=!0===e?"":"none",!0===e){t.onBeforeRender(d,n,a);let e=t.element;/apple/i.test(navigator.vendor)?e.style.transform="translate(-50%,-50%) translate("+Math.round(o.x*i+i)+"px,"+Math.round(-o.y*r+r)+"px)":e.style.transform="translate(-50%,-50%) translate("+(o.x*i+i)+"px,"+(-o.y*r+r)+"px)",e.parentNode!==p&&p.appendChild(e),t.onAfterRender(d,n,a)}let f={distanceToCameraSquared:(l.setFromMatrixPosition(a.matrixWorld),c.setFromMatrixPosition(t.matrixWorld),l.distanceToSquared(c))};u.objects.set(t,f)}for(let i=0,r=t.children.length;i<r;i++)e(t.children[i],n,a)}(e,e,t),function(e){let t=(function(e){let t=[];return e.traverse(function(e){e.isCSS2DObject&&t.push(e)}),t})(e).sort(function(e,t){if(e.renderOrder!==t.renderOrder)return t.renderOrder-e.renderOrder;let n=u.objects.get(e).distanceToCameraSquared,i=u.objects.get(t).distanceToCameraSquared;return n-i}),n=t.length;for(let e=0,i=t.length;e<i;e++)t[e].element.style.zIndex=n-e}(e)},this.setSize=function(e,o){t=e,n=o,i=t/2,r=n/2,p.style.width=e+"px",p.style.height=o+"px"}}}}}]);