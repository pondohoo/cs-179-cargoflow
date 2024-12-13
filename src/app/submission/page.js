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
					<a
						href="https://drive.google.com/file/d/1JL_BzXRfGbNrWAonA-HwpFXcyRX3kEVN/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlow.pdf</strong>
					</a>{" "}
					- Evidence of our efforts to plan our elicitation of requirements from
					Mr. Keogh, and any notes taken during the elicitation.
				</li>
				<li className="text-red-500">
					<a
						href="https://drive.google.com/file/d/1FOM86qgRk5hVelKeKrLsziqeBVaV9P2Y/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowFall2024_Attempt1.pdf</strong>
					</a>{" "}
					- Our original pitch to Mr. Keogh, delivered on March 17th, 2023, at
					10:00 AM.
				</li>
				<li>
					<a
						href="https://drive.google.com/file/d/1SPw5EXKlnAvd49c6xUQBVhDrRMIbLWqr/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowFall2024_Attempt1_Revised.pdf</strong>
					</a>{" "}
					- A new version of the pitch with all corrections, amendments, and
					deletions suggested by Mr. Keogh (and/or Dr. Keogh).
				</li>
				<li>
					<a
						href="https://drive.google.com/file/d/1ohQOhnSiVRi2QzfydBgoBBgXHT3IdppM/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowDesign.pdf</strong>
					</a>{" "}
					- Evidence of our efforts to design our software.
				</li>
				<li>
					<a
						href="https://drive.google.com/file/d/14U0_TQGhIc7SjbvGvmhC7iMYPIp1VlZo/view?usp=sharing"
						className="text-blue-600 underline"
					>
						<strong>CargoFlowTesting.pdf</strong>
					</a>{" "}
					- Evidence of our efforts to test our software.
				</li>
				<li>
					This URL:{" "}
					<a
						href="https://github.com/pondohoo/cs-179-cargoflow"
						className="text-blue-600 underline"
					>
						github.com/pondohoo/cs-179-cargoflow
					</a>{" "}
					- Points to a GitHub repository of our code.
				</li>
				<li className="text-red-500">
					This{" "}
					<a href="#" className="text-blue-600 underline">
						YouTube video
					</a>{" "}
					- Shows our software solving one balance and one transfer test case.
				</li>
				<li className="text-red-500">
					<strong>KeoghsPort2024.txt</strong> - Log created by our software
					during the making of the YouTube video.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">Limitations</h2>
			<ul className="list-disc list-inside mb-4 space-y-2">
				<li>
					The website's storage capacity is limited, and running a complex A*
					search for a certain amount of time tends to exceed it, causing the
					function to pause and stop running. To address this, we reduced the
					time limit from 15 minutes to 5 minutes. While this change prevents
					the website from pausing, it also results in a potential less optimal
					output.
				</li>
			</ul>
		</div>
	);
};

export default Submission;
