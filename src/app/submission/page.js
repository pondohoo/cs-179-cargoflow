const Submission = () => {
	return (
		<div className="text-black bg-blue-100 p-8 font-sans leading-relaxed">
			<div className="flex gap-10">
				<h1 className="text-2xl font-bold mb-2">Team CargoFlow Inc.</h1>
				<p className="italic text-gray-600 mb-4">
					(This webpage was last edited on 12-13-2024)
				</p>
			</div>

			<h2 className="text-xl font-semibold mb-2">Team Members</h2>
			<ul className="list-disc list-inside mb-4">
				<li>
					Jason Chau,{" "}
					<a href="mailto:jchau044@ucr.edu" className="text-blue-600 underline">
						jchau044@ucr.edu
					</a>
				</li>
				<li>
					Danniel Kim,{" "}
					<a href="mailto:dkim481@ucr.edu" className="text-blue-600 underline">
						dkim481@ucr.edu
					</a>
				</li>
				<li>
					Gurjot Singh,{" "}
					<a href="mailto:gsing064@ucr.edu" className="text-blue-600 underline">
						gsing064@ucr.edu
					</a>
				</li>
				<li>
					Desmond Chi,{" "}
					<a href="mailto:dchi008@ucr.edu" className="text-blue-600 underline">
						dchi008@ucr.edu
					</a>
				</li>
				<li>
					Theo Fernandez,{" "}
					<a href="mailto:tfern009@ucr.edu" className="text-blue-600 underline">
						tfern009@ucr.edu
					</a>
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Project Files</h2>
			<ol className="list-decimal list-inside mb-4 space-y-2">
				<li>
					<strong>CargoMovers.pdf</strong> - Evidence of our efforts to plan our
					elicitation of requirements from Mr. Keogh, and any notes taken during
					the elicitation.
				</li>
				<li>
					<a
						href="https://drive.google.com/file/d/1FOM86qgRk5hVelKeKrLsziqeBVaV9P2Y/view?usp=sharing"
						className="text-blue-600 underline"
					><strong>CargoFlowProjectPitchORIGINAL.pdf</strong></a> - Our original
					pitch to Mr. Keogh, delivered on March 17th, 2023, at 10:00 AM.
				</li>
				<li>
					<strong>CargoMoversProjectPitchCORRECTED.pdf</strong> - A new version
					of the pitch with all corrections, amendments, and deletions suggested
					by Mr. Keogh (and/or Dr. Keogh).
				</li>
				<li>
					<strong>CargoMoversDesign.pdf</strong> - Evidence of our efforts to
					design our software.
				</li>
				<li>
					<strong>CargoMoversTesting.pdf</strong> - Evidence of our efforts to
					test our software.
				</li>
				<li>
					This URL:{" "}
					<a
						href="https://github.com/CargoMovers"
						className="text-blue-600 underline"
					>
						github.com/CargoMovers
					</a>{" "}
					- Points to a GitHub repository of our code.
				</li>
				<li>
					This{" "}
					<a href="#" className="text-blue-600 underline">
						YouTube video
					</a>{" "}
					- Shows our software solving one balance and one transfer test case.
				</li>
				<li>
					<strong>KeoghsPort2024.txt</strong> - Log created by our software
					during the making of the YouTube video.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">Limitations</h2>
			<ul className="list-disc list-inside mb-4 space-y-2">
				<li>We did not implement “recovery from a power outage”.</li>
				<li>
					We did not implement checks for the container name, so a naïve user
					might type in “NAN” as a container name and we would accept it.
				</li>
				<li>
					We did not implement duplicate name substitution. Duplicate named
					containers may lead to unexpected results.
				</li>
				<li>
					If there are more than 30 containers to be offloaded, our program may
					hang or crash (but this never happens for fewer than 30 containers).
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Optional Information</h2>
			<ul className="list-disc list-inside space-y-2">
				<li>Additional items for grading the project.</li>
				<li>
					Acknowledgments: We asked advice from Dr. Smith about heuristics,
					watched a{" "}
					<a href="#" className="text-blue-600 underline">
						YouTube video
					</a>{" "}
					about user interface design, and referred to the book
					<em>
						Simply Put!: Helping Stakeholders Discover and Define Requirements
						for IT Projects
					</em>{" "}
					by Thomas Hathaway.
				</li>
			</ul>
		</div>
	);
};

export default Submission;
